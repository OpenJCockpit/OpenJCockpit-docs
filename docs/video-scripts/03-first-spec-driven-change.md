---
title: "Your first spec-driven change, end to end"
description: "Video script: Your first spec-driven change, end to end."
sidebar_position: 4
---

# 3. Your first spec-driven change, end to end (12 minutes)

Tutorial: `docs/tutorials/first-spec-driven-change.mdx` · Demo project: `openjcockpit-demo-shop`,
spec `001-add-isbn-field`.

**Goal:** add an ISBN field to a small Spring Boot API without writing code: spec in, reviewed branch
out.

**Before recording:** running stack, fork of the demo shop **without** `.specify` on the base branch,
throwaway GitHub token, a dry run of spec 001 so you know roughly how long each agent takes.

## Chapters

- 0:00 What you will build
- 0:45 Add the project and a Git credential
- 2:00 Initialize the spec structure
- 3:00 Read the spec
- 4:30 Run the Implement spec workflow
- 7:30 Review the branch
- 10:00 Open the pull request
- 11:00 What just happened, and limits

---

## 0:00 What you will build `[CHAPTER]`

**SCREEN:** Version card. Split screen: the spec on the left, the finished branch diff on the right.

**VO:**
You will add an ISBN field to a small Spring Boot API, and you will write no code yourself. A spec
describes the change. A workflow of agents implements it on its own Git branch. Then you review the
result, the same way you would review a colleague's work.

You need the running stack from the quickstart, a fork of the demo shop, a GitHub token that can push
branches to it, and JDK 25 with Maven to verify the result.

As before, this runs on a local model, so speed and output vary.

## 0:45 Add the project and a Git credential `[CHAPTER]`

**SCREEN:** Dashboard, add project, paste fork URL. Then Settings, Git credentials. **Token field
blurred or hidden; cut away while typing it.**

**VO:**
In the dashboard, add a project with the URL of your fork. Then add a Git credential under Settings,
Git credentials. Use a throwaway token. I am keeping it off screen.

**SCREEN:** Checkpoint: the project appears in the project selector.

## 2:00 Initialize the spec structure `[CHAPTER]`

**SCREEN:** Spec files area showing the spec-init offer. Click it. Switch to GitHub, show the starter
template branch, merge it.

**VO:**
My repository has no dot-specify folder on its base branch, so the dashboard offers the spec-init flow.
It pushes a starter template branch. Review it on GitHub and merge it.

**SCREEN:** Back in the dashboard: spec-init is gone, "Create spec with prompt" is visible.

## 3:00 Read the spec `[CHAPTER]`

**SCREEN:** `specs/001-add-isbn-field/spec.md` on GitHub. Highlight the three requirements and four
acceptance criteria.

**VO:**
The demo repository already contains the first spec. Read it before you run anything. It has three
requirements and four acceptance criteria, and each one is testable. That matters, because the spec is
the contract: the agents implement it, and you will review against it.

If you prefer to write your own, use Create spec with prompt. It starts a workflow with the Business
Analyst agent.

**SCREEN:** Checkpoint: spec `001-add-isbn-field` listed.

## 4:30 Run the Implement spec workflow `[CHAPTER]`

**SCREEN:** Select the spec, start **Implement spec**. Then the flow diagram: Solution Architect →
Software Developer → QA Engineer. Then the live workflow execution view.

**VO:**
Select the spec and start the Implement spec workflow. Three agents run in order. The Solution Architect
designs the change. The Software Developer writes code and tests. The QA Engineer verifies against the
acceptance criteria.

In the execution view you can follow the agent sequence, the logs, the outputs, the policy decisions,
and the Git branch.

`[SPEED-UP]` Mark on screen: "8x speed. Each agent call can take minutes on a local model."

**VO:**
This is slow on a local model, so I am speeding it up. When it finishes, you see all three agents done
and a branch with one checkpoint commit per agent.

## 7:30 Review the branch `[CHAPTER]`

**SCREEN:** GitHub branch, commit list (three checkpoint commits), then the diff.

**VO:**
Now the important part. The default workflows do not open a pull request or merge anything. They give
you a branch. Open it and read the diff against the spec.

**SCREEN:** Terminal.

```bash
git fetch origin
git switch <run-branch>
mvn verify
```

**VO:**
Fetch the branch, switch to it, and run mvn verify. Then go through the acceptance criteria one by one
and find the test for each. If a criterion has no test, that is a review finding. You do not accept it
just because the agents were confident.

**SCREEN:** Checkpoint: `mvn verify` passes; a request to `GET /api/books/isbn/{isbn}` returns a
created book.

## 10:00 Open the pull request `[CHAPTER]`

**SCREEN:** GitHub: open a PR from the run branch.

**VO:**
Open a pull request from the run branch, the way you would for a colleague. Merging is your decision,
not the agents'.

## 11:00 What just happened, and limits `[CHAPTER]`

**SCREEN:** The diagram from video 1, with the "workflow of agents" and "branch" boxes highlighted.

**VO:**
The spec was the input contract. The workflow chained role-based agents, each building on the previous
output, and every output was committed as a checkpoint on a separate branch. Nothing reached your base
branch without your review.

Two limits to know. Output varies from run to run on a local model. And the default workflows have no
approval gate. That is exactly what the next video adds.

**SCREEN:** Outro: "Next: Approval gates". Description lists the three troubleshooting snags.

---

## Production notes

- Troubleshooting to mention only if it happened: container fails to start (pull the job image), `502`
  on start (clone failed, check URL and credential), "run state lost" (restart the workflow).
- If the model produces a poor result on camera, keep it and review it honestly. That is the point of
  the review step. Do not re-roll until it looks good without saying so.
- **VERIFY:** the spec-init flow, the one-commit-per-agent behaviour and the exact checkpoint text on
  the first clean run.
