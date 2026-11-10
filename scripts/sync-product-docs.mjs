#!/usr/bin/env node
// Syncs the product reference docs (OpenJCockpit/docs/readme) into ./reference.
//
//   PRODUCT_DOCS_DIR  path to a checkout of the OpenJCockpit repo (default ../OpenJCockpit)
//   PRODUCT_DOCS_REF  git ref used in generated GitHub links (default main)
//
// The ./reference folder is generated and git-ignored. Edit the docs in the product repo.
// Exits non-zero when a link cannot be resolved, so broken links fail the build.

import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const siteDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const repoDir = path.resolve(siteDir, process.env.PRODUCT_DOCS_DIR ?? '../OpenJCockpit');
const ref = process.env.PRODUCT_DOCS_REF ?? 'main';
const github = 'https://github.com/OpenJCockpit/OpenJCockpit';
const docsRoot = path.join(repoDir, 'docs', 'readme');
const outDir = path.join(siteDir, 'reference');

const errors = [];
const toPosix = (p) => p.split(path.sep).join('/');

if (!fs.existsSync(path.join(docsRoot, 'README.md'))) {
  console.error(`sync-product-docs: ${docsRoot}/README.md not found. Set PRODUCT_DOCS_DIR.`);
  process.exit(1);
}

function listMarkdown(dir) {
  return fs.readdirSync(dir, {withFileTypes: true}).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return listMarkdown(full);
    return entry.name.endsWith('.md') ? [full] : [];
  });
}

// Destination path for a source file: README.md at the root becomes index.md.
function destRel(srcRel) {
  return srcRel === 'README.md' ? 'index.md' : srcRel;
}

// Section labels and page order come from the "All pages" part of docs/readme/README.md.
function parseStructure(readme) {
  const sections = []; // {label, dir, position}
  const pagePosition = new Map(); // srcRel -> position inside its section
  let current = null;
  let inAllPages = false;
  for (const line of readme.split('\n')) {
    if (/^## /.test(line)) inAllPages = line.trim() === '## All pages';
    if (!inAllPages) continue;
    const heading = line.match(/^### (.+)$/);
    if (heading) {
      current = {label: heading[1].trim(), dir: null, count: 0};
      sections.push(current);
      continue;
    }
    const item = line.match(/^- \[[^\]]+\]\(([^)#]+\.md)\)/);
    if (item && current) {
      current.count += 1;
      current.dir ??= path.posix.dirname(item[1]);
      pagePosition.set(item[1], current.count);
    }
  }
  return {sections, pagePosition};
}

// Rewrites one link target. Returns the new target, or null (and records an error) if it cannot be resolved.
function rewriteTarget(target, srcAbs, srcRel) {
  if (/^([a-z][a-z0-9+.-]*:|#|\/\/)/i.test(target)) return target; // external, mailto, anchor
  const [rawPath, ...anchorParts] = target.split('#');
  const anchor = anchorParts.length ? `#${anchorParts.join('#')}` : '';
  if (!rawPath) return target;
  const abs = path.resolve(path.dirname(srcAbs), decodeURI(rawPath));
  const insideDocs = abs === docsRoot || abs.startsWith(docsRoot + path.sep);
  const insideRepo = abs === repoDir || abs.startsWith(repoDir + path.sep);
  if (!insideRepo) {
    errors.push(`${srcRel}: link leaves the repository: ${target}`);
    return null;
  }
  if (!fs.existsSync(abs)) {
    errors.push(`${srcRel}: link target does not exist: ${target}`);
    return null;
  }
  const repoRel = toPosix(path.relative(repoDir, abs));
  if (insideDocs && abs.endsWith('.md')) {
    const targetRel = toPosix(path.relative(docsRoot, abs));
    let rel = toPosix(path.relative(path.dirname(path.join(outDir, destRel(srcRel))), path.join(outDir, destRel(targetRel))));
    if (!rel.startsWith('.')) rel = `./${rel}`;
    return rel + anchor;
  }
  if (insideDocs) {
    errors.push(`${srcRel}: link to a non-Markdown file inside docs/readme is not supported: ${target}`);
    return null;
  }
  const kind = fs.statSync(abs).isDirectory() ? 'tree' : 'blob';
  return `${github}/${kind}/${ref}/${repoRel}${anchor}`;
}

function transformBody(body, srcAbs, srcRel) {
  let inFence = false;
  return body
    .split('\n')
    .map((line) => {
      if (/^\s*(```|~~~)/.test(line)) inFence = !inFence;
      if (inFence) return line;
      // Inline links and images: [text](target "title")
      let out = line.replace(/(\]\()([^)\s]+)((?:\s+"[^"]*")?\))/g, (m, open, target, tail) => {
        const next = rewriteTarget(target, srcAbs, srcRel);
        return next === null ? m : `${open}${next}${tail}`;
      });
      // Reference definitions: [id]: target
      out = out.replace(/^(\s*\[[^\]]+\]:\s+)(\S+)/, (m, open, target) => {
        const next = rewriteTarget(target, srcAbs, srcRel);
        return next === null ? m : `${open}${next}`;
      });
      return out;
    })
    .join('\n');
}

const readme = fs.readFileSync(path.join(docsRoot, 'README.md'), 'utf8');
const {sections, pagePosition} = parseStructure(readme);

fs.rmSync(outDir, {recursive: true, force: true});
fs.mkdirSync(outDir, {recursive: true});

const files = listMarkdown(docsRoot).sort();
for (const srcAbs of files) {
  const srcRel = toPosix(path.relative(docsRoot, srcAbs));
  let text = fs.readFileSync(srcAbs, 'utf8');
  if (text.startsWith('---\n')) {
    errors.push(`${srcRel}: already has front matter; extend the sync script to merge it`);
    continue;
  }
  const h1 = text.match(/^# (.+)$/m);
  if (!h1) {
    errors.push(`${srcRel}: no H1 heading to use as title`);
    continue;
  }
  const isRoot = srcRel === 'README.md';
  const position = isRoot ? 0 : (pagePosition.get(srcRel) ?? 99);
  if (!isRoot && !pagePosition.has(srcRel)) console.warn(`sync-product-docs: ${srcRel} is not listed in README "All pages"`);

  const front = [
    '---',
    `title: ${JSON.stringify(h1[1].replace(/`/g, '').trim())}`,
    ...(isRoot ? ['slug: /', 'sidebar_label: Overview'] : []),
    `sidebar_position: ${position}`,
    `custom_edit_url: ${JSON.stringify(`${github}/edit/${ref}/docs/readme/${srcRel}`)}`,
    '---',
    '',
    '',
  ].join('\n');

  const dest = path.join(outDir, destRel(srcRel));
  fs.mkdirSync(path.dirname(dest), {recursive: true});
  fs.writeFileSync(dest, front + transformBody(text, srcAbs, srcRel));
}

// One _category_.json per section folder: label and order.
sections.forEach((section, index) => {
  if (!section.dir || section.dir === '.') return;
  const dir = path.join(outDir, section.dir);
  if (!fs.existsSync(dir)) return;
  fs.writeFileSync(
    path.join(dir, '_category_.json'),
    JSON.stringify({label: section.label, position: index + 1}, null, 2) + '\n',
  );
});

if (errors.length) {
  console.error(`sync-product-docs: ${errors.length} problem(s):\n- ${errors.join('\n- ')}`);
  process.exit(1);
}
console.log(`sync-product-docs: ${files.length} pages from ${path.relative(siteDir, docsRoot) || docsRoot} @ ${ref} -> reference/`);
