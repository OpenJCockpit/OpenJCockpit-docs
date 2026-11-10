// Fails when src/css/tokens.css drifts from the frontend's _tokens.scss.
// Usage: node scripts/check-tokens.mjs [path-to-_tokens.scss]
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const source = resolve(
  process.argv[2] ?? "../OpenJCockpit-frontend/libs/ui/src/styles/_tokens.scss",
);
const local = resolve("src/css/tokens.css");

function parse(text) {
  const out = new Map();
  const clean = text
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/^\s*\/\/.*$/gm, "");
  const blockRe = /([^{}]+)\{([^{}]*)\}/g;
  let m;
  while ((m = blockRe.exec(clean))) {
    const selector = m[1].trim().replace(/\s+/g, " ");
    for (const d of m[2].matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) {
      out.set(`${selector} ${d[1]}`, d[2].trim().replace(/\s+/g, " "));
    }
  }
  return out;
}

const a = parse(readFileSync(source, "utf8"));
const b = parse(readFileSync(local, "utf8"));
const problems = [];
for (const [k, v] of a) {
  if (!b.has(k)) problems.push(`missing locally: ${k}`);
  else if (b.get(k) !== v)
    problems.push(`differs: ${k}\n  frontend: ${v}\n  local:    ${b.get(k)}`);
}
for (const k of b.keys()) if (!a.has(k)) problems.push(`extra locally: ${k}`);

if (problems.length) {
  console.error(
    `tokens.css is out of sync with ${source}:\n${problems.join("\n")}`,
  );
  process.exit(1);
}
console.log(`tokens.css matches ${source} (${a.size} tokens)`);
