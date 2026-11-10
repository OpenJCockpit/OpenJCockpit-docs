---
title: "Video scripts"
description: "Narration and screen directions for every OpenJCockpit tutorial video."
sidebar_position: 1
---

# Video scripts

One script per `<WrittenAndVideo>` block in `docs/`. Each script follows the
written tutorial, so the narration, the chapters and the transcript match the steps on the page.

| #   | Script                                                           | Tutorial                                      | Target length |
| --- | ---------------------------------------------------------------- | --------------------------------------------- | ------------- |
| 1   | [01-what-is-openjcockpit.md](01-what-is-openjcockpit.md)         | `docs/intro.mdx`                              | 3 min         |
| 2   | [02-quickstart.md](02-quickstart.md)                             | `docs/getting-started/quickstart.mdx`         | 7 min         |
| 3   | [03-first-spec-driven-change.md](03-first-spec-driven-change.md) | `docs/tutorials/first-spec-driven-change.mdx` | 12 min        |
| 4   | [04-approval-gates.md](04-approval-gates.md)                     | `docs/tutorials/approval-gates.mdx`           | 5 min         |
| 5   | [05-policy-as-code.md](05-policy-as-code.md)                     | `docs/tutorials/policy-as-code.mdx`           | 6 min         |
| 6   | [06-credential-isolation.md](06-credential-isolation.md)         | `docs/concepts/credential-isolation.mdx`      | 5 min         |
| 7   | [07-custom-agent.md](07-custom-agent.md)                         | `docs/tutorials/custom-agent.mdx`             | 10 min        |
| 8   | [08-bring-your-own-model.md](08-bring-your-own-model.md)         | `docs/tutorials/bring-your-own-model.mdx`     | 5 min         |

## Script format

- **SCREEN** is what the viewer sees. **VO** is the narration, written to be spoken (about 140 words
  per minute).
- `[CHAPTER]` marks a YouTube chapter. Copy the chapters into the video description.
- `[SPEED-UP]` marks waiting time on the local model. Cut or speed up, and label it on screen
  ("8x speed").
- After recording, paste the VO text as the transcript (the checklist requires captions or a
  transcript on every video) and set the `videoId` on the `<WrittenAndVideo>` block.

## Rules for every video

1. Open with the version card: "Tested on OpenJCockpit commit `<sha>`". Fill in the real commit
   before recording.
2. Say once, on screen, that the demo runs on local `qwen3.6:27b` and that output varies.
3. Seeded credentials (`tony`) appear only with the "local development only" lower third.
4. Never show a real API key or Git token. Use a throwaway `.env` and a throwaway token, and blur
   anything else.
5. Re-run every step on a clean checkout before recording. Anything in a script that differs from
   what actually happens on screen is a bug in the script: fix the script and the written tutorial.
6. The tutorials are still marked "draft, not yet verified on a clean machine". The scripts inherit
   that status. Lines tagged **VERIFY** depend on behaviour the tutorial has not confirmed yet.
7. Close every video with the same outro: next tutorial, link to the site, "output varies, review
   every branch".

## Shared assets

- Logo: `OpenJCockpit_logo.png`, `OpenJCockpit_logo_horizontal.png`
- Reusable intro (3 s) and outro (5 s)
- Terminal theme and font size fixed across all recordings (at least 18 pt for readability)
- Demo project: `openjcockpit-demo-shop`, specs 001-003
- The one-line thread to repeat in the series: **idea → spec → agent workflow → policy check →
  approval gate → reviewable Git branch → PR**
