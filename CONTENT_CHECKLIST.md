# Content checklist

Run before every OpenJCockpit release and before publishing a tutorial.

## Per tutorial

- [ ] Every step re-run end to end on a clean checkout.
- [ ] `<VersionBanner />` bumped to the tested release or commit.
- [ ] Every step has a `<Checkpoint>`.
- [ ] Seeded credentials appear only next to `<LocalOnlyWarning />`.
- [ ] No real API keys on screen or in the repo.
- [ ] Alt text on every image, transcript or captions on every video.
- [ ] Troubleshooting lists only snags that actually occurred.
- [ ] Link to `/reference/...` pages with internal links. Do not copy reference tables, flags or configuration into tutorials.
- [ ] Relevant known limitations stated.

## Per release

- [ ] Re-run all tutorials, update screenshots only where the UI changed.
- [ ] Add a "What's new" post when learners are affected.
