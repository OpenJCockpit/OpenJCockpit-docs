# OpenJCockpit Docs

Source of [OpenJCockpit Docs](https://openjcockpit.github.io/OpenJCockpit-docs/), built with
[Docusaurus](https://docusaurus.io/). The site has two parts:

- **Learn** (`docs/`, `/learn`): hand-written tutorials, concepts, workshops and video scripts that
  teach governed, spec-driven AI software development with
  [OpenJCockpit](https://github.com/OpenJCockpit/OpenJCockpit).
- **Reference** (`reference/`, `/reference`): the product documentation. It is **generated**: it is
  copied from `docs/readme/` in the OpenJCockpit repository by `scripts/sync-product-docs.mjs` and is
  git-ignored. Edit those pages in the product repository, never here.

## Develop

Requires Node 22 or newer (`.nvmrc`; CI also builds on 24).

```bash
npm ci
npm run sync-docs  # copy product docs into reference/ (runs before start and build)
npm start          # dev server
npm run build      # production build, fails on broken links
npm run lint       # Prettier and markdownlint
npm run typecheck
```

## Video scripts flag

The video scripts are published but hidden. They only show up (sidebar entry, direct URLs) in a
browser where this flag is set:

```js
localStorage.setItem("ojc:showVideoScripts", "true"); // then reload
localStorage.removeItem("ojc:showVideoScripts"); // hide again
```

Shortcut: open any page with `?videoScripts=on` (or `?videoScripts=off`). Without the flag, the
sidebar entry is hidden and direct visits to `/learn/video-scripts/...` redirect to the intro.

This is not access control. The pages stay in the built site, the sitemap and the search index, and
the files are in the repository. Anything truly private needs a private repo or a login.

## Product docs source

The sync script reads a checkout of the OpenJCockpit repository:

| Variable           | Default           | Purpose                                     |
| ------------------ | ----------------- | ------------------------------------------- |
| `PRODUCT_DOCS_DIR` | `../OpenJCockpit` | Path to the checkout                        |
| `PRODUCT_DOCS_REF` | `main`            | Ref used in generated GitHub and edit links |

An unresolvable link in the product docs stops the sync, and with it the build. CI checks out the
product repository itself. Product docs changes trigger a rebuild through a `repository_dispatch`
event (`product-docs-updated`), and a weekly schedule catches anything missed.

## Writing a tutorial

Follow the template in the plan (`docs/DOCUSAURUS_EDUCATION_SITE_PLAN.md` in the OJC workspace; the rebrand is in `docs/EDUCATION_REBRAND_DOCUMENTATION_PLAN.md`) and
tick [CONTENT_CHECKLIST.md](CONTENT_CHECKLIST.md). Components such as `<VideoEmbed />`,
`<VersionBanner />`, `<LocalOnlyWarning />`, `<ModelNote />`, `<Prerequisites />`, `<Checkpoint>` and
`<WrittenAndVideo>` are available in every MDX file without imports.

## Demo project

Tutorials use [openjcockpit-demo-shop](https://github.com/OpenJCockpit/openjcockpit-demo-shop) and its
three specs, also available under `static/downloads/specs/`.
