// Crawls the built site (build/) and reports broken links. No dependencies.
//
// Internal: every <a href>, plus <img>/<script>/<link> targets, must resolve to a
// file in build/, and #fragments must match an id/name in the target page.
// External (opt-in with --external): http(s) links are requested with retries.
//
// Usage: node scripts/check-links.mjs [--external] [--build-dir build]
//        [--base-url /OpenJCockpit-docs/] [--concurrency 8] [--timeout 15000]
// Run `npm run build` first. Exits 1 when a broken link is found.
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, resolve, posix } from "node:path";

const args = process.argv.slice(2);
const flag = (name) => args.includes(`--${name}`);
const opt = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
};

const buildDir = resolve(opt("build-dir", "build"));
const baseUrl = opt("base-url", "/OpenJCockpit-docs/");
const basePrefix = baseUrl.replace(/\/$/, "");
const checkExternal = flag("external");
const concurrency = Number(opt("concurrency", "8"));
const timeoutMs = Number(opt("timeout", "15000"));

// Placeholder hosts; never worth failing a build over.
const IGNORED_HOSTS = ["localhost", "127.0.0.1", "example.com", "example.org"];
// Statuses meaning "exists but refuses automated clients".
const SOFT_OK = new Set([401, 403, 429]);

if (!existsSync(buildDir)) {
  console.error(`No build output at ${buildDir}. Run \`npm run build\` first.`);
  process.exit(2);
}

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

const htmlFiles = walk(buildDir).filter((f) => f.endsWith(".html"));
const idCache = new Map(); // file -> Set<string>

function idsOf(file) {
  if (!idCache.has(file)) {
    const html = readFileSync(file, "utf8");
    const ids = new Set();
    for (const m of html.matchAll(/\s(?:id|name)=(?:"([^"]*)"|'([^']*)')/g)) {
      ids.add(m[1] ?? m[2]);
    }
    idCache.set(file, ids);
  }
  return idCache.get(file);
}

function decodeEntities(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'");
}

function extractLinks(html) {
  const out = [];
  const re =
    /<(a|img|script|link|source|video|iframe)\b[^>]*?\s(href|src)=(?:"([^"]*)"|'([^']*)')[^>]*>/gi;
  for (const m of html.matchAll(re)) {
    const isMetaLink =
      m[1].toLowerCase() === "link" &&
      /rel=["'](?:preconnect|dns-prefetch|canonical|alternate|search)/i.test(m[0]);
    if (!isMetaLink) out.push(decodeEntities(m[3] ?? m[4] ?? ""));
  }
  return out;
}

// Map a base-stripped site path to a file in build/.
function resolveFile(sitePath) {
  let clean;
  try {
    clean = decodeURIComponent(sitePath).replace(/^\/+/, "");
  } catch {
    return undefined;
  }
  const candidates =
    clean === "" || clean.endsWith("/")
      ? [join(buildDir, clean, "index.html")]
      : [
          join(buildDir, clean),
          join(buildDir, `${clean}.html`),
          join(buildDir, clean, "index.html"),
        ];
  return candidates.find((c) => existsSync(c) && statSync(c).isFile());
}

function splitUrl(href) {
  const hashAt = href.indexOf("#");
  const hash = hashAt < 0 ? "" : href.slice(hashAt + 1);
  const rest = hashAt < 0 ? href : href.slice(0, hashAt);
  const queryAt = rest.indexOf("?");
  return [queryAt < 0 ? rest : rest.slice(0, queryAt), hash];
}

const problems = [];
const externals = new Map(); // url -> Set<page>

for (const file of htmlFiles) {
  const page = relative(buildDir, file).split("\\").join("/");
  const pageUrl = posix.join(baseUrl, page);
  const html = readFileSync(file, "utf8");

  for (const raw of new Set(extractLinks(html))) {
    const href = raw.trim();
    if (!href || /^(mailto:|tel:|data:|javascript:)/i.test(href)) continue;

    if (/^(https?:)?\/\//i.test(href)) {
      const url = href.startsWith("//") ? `https:${href}` : href;
      if (!externals.has(url)) externals.set(url, new Set());
      externals.get(url).add(page);
      continue;
    }

    const [pathPart, hash] = splitUrl(href);
    const abs =
      pathPart === ""
        ? pageUrl
        : pathPart.startsWith("/")
          ? pathPart
          : posix.join(posix.dirname(pageUrl), pathPart);
    const normalized = posix.normalize(abs);
    if (normalized !== basePrefix && !normalized.startsWith(`${basePrefix}/`)) {
      problems.push({ page, href, why: `outside baseUrl ${baseUrl}` });
      continue;
    }
    const target = resolveFile(normalized.slice(basePrefix.length) || "/");
    if (!target) {
      problems.push({ page, href, why: "target not found" });
      continue;
    }
    if (hash && target.endsWith(".html")) {
      let frag = hash;
      try {
        frag = decodeURIComponent(hash);
      } catch {}
      if (frag !== "top" && !idsOf(target).has(frag)) {
        problems.push({ page, href, why: `anchor #${frag} not found` });
      }
    }
  }
}

async function probe(url) {
  let last = "unreachable";
  for (let attempt = 0; attempt < 3; attempt++) {
    for (const method of ["HEAD", "GET"]) {
      try {
        const res = await fetch(url, {
          method,
          redirect: "follow",
          signal: AbortSignal.timeout(timeoutMs),
          headers: { "user-agent": "docs-link-checker/1.0" },
        });
        if (res.ok || SOFT_OK.has(res.status)) return null;
        last = `HTTP ${res.status}`;
        // HEAD is often rejected; only trust a GET. Retry only on transient errors.
        if (method === "GET" && res.status < 500 && res.status !== 408) return last;
      } catch (e) {
        last = e.cause?.code ?? e.name;
      }
    }
    await new Promise((r) => setTimeout(r, 1000 * (attempt + 1)));
  }
  return last;
}

if (checkExternal) {
  const queue = [];
  for (const url of externals.keys()) {
    try {
      if (!IGNORED_HOSTS.includes(new URL(url).hostname)) queue.push(url);
    } catch {
      for (const page of externals.get(url)) {
        problems.push({ page, href: url, why: "invalid URL" });
      }
    }
  }
  console.log(`Checking ${queue.length} external links...`);
  await Promise.all(
    Array.from({ length: concurrency }, async () => {
      while (queue.length) {
        const url = queue.shift();
        const why = await probe(url);
        if (why) {
          for (const page of externals.get(url)) problems.push({ page, href: url, why });
        }
      }
    }),
  );
}

console.log(
  `Scanned ${htmlFiles.length} pages${
    checkExternal
      ? ` and ${externals.size} external URLs`
      : " (internal only; pass --external for outbound links)"
  }.`,
);

if (problems.length) {
  problems.sort((a, b) => a.page.localeCompare(b.page));
  console.error(`\n${problems.length} broken link(s):`);
  for (const p of problems) console.error(`  ${p.page}\n    ${p.href}  ->  ${p.why}`);
  process.exit(1);
}
console.log("No broken links.");
