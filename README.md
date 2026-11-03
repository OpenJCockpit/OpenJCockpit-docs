# OpenJCockpit Education

Source of the [OpenJCockpit education site](https://openjcockpit.github.io/openJCockpit-education/),
built with [Docusaurus](https://docusaurus.io/). It teaches governed, spec-driven AI software
development with [OpenJCockpit](https://github.com/OpenJCockpit/OpenJCockpit). Product reference docs
stay in that repo and are linked, not copied.

## Develop

Requires Node 22 or newer (`.nvmrc`; CI also builds on 24).

```bash
npm ci
npm start          # dev server
npm run build      # production build, fails on broken links
npm run lint       # Prettier and markdownlint
npm run typecheck
```

## Writing a tutorial

Follow the template in the plan (`docs/DOCUSAURUS_EDUCATION_SITE_PLAN.md` in the OJC workspace) and
tick [CONTENT_CHECKLIST.md](CONTENT_CHECKLIST.md). Components such as `<VideoEmbed />`,
`<VersionBanner />`, `<LocalOnlyWarning />`, `<ModelNote />`, `<Prerequisites />`, `<Checkpoint>` and
`<WrittenAndVideo>` are available in every MDX file without imports.

## Demo project

Tutorials use [openjcockpit-demo-shop](https://github.com/OpenJCockpit/openjcockpit-demo-shop) and its
three specs, also available under `static/downloads/specs/`.
