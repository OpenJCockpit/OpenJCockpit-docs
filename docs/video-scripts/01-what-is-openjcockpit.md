---
title: "What is OpenJCockpit?"
description: "Video script: What is OpenJCockpit?."
sidebar_position: 2
---

# 1. What is OpenJCockpit? (3 minutes)

Tutorial: `docs/intro.mdx` · Audience: Java developers, tech leads · No live demo needed, animated
diagram plus a short dashboard glimpse.

**Goal:** the viewer can repeat the thread: idea → spec → agent workflow → policy check → approval
gate → reviewable Git branch → PR.

## Chapters

- 0:00 The problem
- 0:40 The idea in one picture
- 1:20 Four ideas to remember
- 2:20 Who this is for, and where to start

---

## 0:00 The problem `[CHAPTER]`

**SCREEN:** Logo sting, then a screenshot of a pull request with a huge AI-generated diff. A red
question mark pops up next to it.

**VO:**
Coding agents are very good at producing code. But shipping software a team can stand behind takes
more than code. It takes clear requirements, a sound design, tests, review, policy, and controlled
delivery.

Without that structure, AI-generated changes are hard to trust, hard to trace, and hard to govern.
That is the problem OpenJCockpit is built for.

## 0:40 The idea in one picture `[CHAPTER]`

**SCREEN:** Animate the Mermaid flow from the intro page, one box at a time: Idea → Spec in your repo →
Workflow of agents → Approval gate and policy checks → Branch with checkpoint commits → Human review and
pull request. The "deny" arrow loops back to the spec.

**VO:**
OpenJCockpit is an open-source AI Software Factory. Instead of one assistant writing code on its own,
it runs a team of specialised agents through a specification-driven workflow.

You start with an idea and turn it into a spec that lives in your repository: requirements, and
acceptance criteria. A workflow of agents implements it: an analyst, an architect, a developer, and a QA
engineer, each building on the previous output.

Before anything is accepted, policy checks and approval gates decide what may happen. If you deny, the
work goes back. If you accept, the result lands on its own Git branch with checkpoint commits, and you
review it and open the pull request.

You decide what gets built, which agents may do what, and where a human must approve.

## 1:20 Four ideas to remember `[CHAPTER]`

**SCREEN:** Four cards appear in turn, each with a one-word title and a two-line caption. A short clip
of the dashboard (workflow execution view) behind the last two.

**VO:**
Four ideas to remember.

One: spec-driven. A specification in your repository is the contract. The agents implement it, and you
review against it.

Two: role-based agents. Business analyst, solution architect, software developer, and QA engineer. Each
role builds on the previous one.

Three: governed. Policies written as code decide what agents may do, and approval gates stop a run until
a person decides.

Four: reviewable. Every run works on its own Git branch with checkpoint commits. Nothing lands without
your review.

## 2:20 Who this is for `[CHAPTER]`

**SCREEN:** Lower third: "Active development. Java-first." Then the education site home page, with the
Quickstart link highlighted.

**VO:**
A quick honest note: OpenJCockpit is in active development, and it is Java-first. Things will change, so
every tutorial on this site tells you which version it was tested on.

If you are a Java developer, start with the quickstart and run it on your own machine. If you are a tech
lead or architect, jump to the tutorials on approval gates and policy as code.

Everything is linked from the OpenJCockpit Docs site. See you in the quickstart.

**SCREEN:** Outro card: "Next: Quickstart" and the site URL.

---

## Production notes

- No recording of the stack is required. Capture one short dashboard clip from the Quickstart session.
- Keep the diagram animation identical to the one reused in video 3 (the Implement spec flow).
- Do not claim production readiness. The honest-status line is required.
