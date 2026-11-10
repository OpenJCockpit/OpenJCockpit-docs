---
title: "Approval gates: a human decision inside the run"
description: "Video script: Approval gates: a human decision inside the run."
sidebar_position: 5
---

# 4. Approval gates: a human decision inside the run (5 minutes)

Tutorial: `docs/tutorials/approval-gates.mdx` · Demo project spec: `002-validate-book-input`.

**Goal:** add a gate after the Software Developer, review the changes, and use accept, deny, and accept
with comments.

**Before recording:** finished video 3 so the project exists. Do a dry run so the first developer pass
is predictable. Pre-write the feedback comment.

## Chapters

- 0:00 What you will build
- 0:30 Add a gate in Workflow Design
- 1:30 Run it and review at the gate
- 3:00 Accept with comments
- 4:00 The limits you must know

---

## 0:00 What you will build `[CHAPTER]`

**SCREEN:** Version card. Flow: Architect → Developer → **gate** → QA.

**VO:**
In this video you will add an approval gate to the Implement spec workflow, so the run pauses after the
Software Developer. Then you review what changed, and decide: accept, deny, or accept with comments.

You should have finished your first spec-driven change. Local model again, so output varies.

## 0:30 Add a gate in Workflow Design `[CHAPTER]`

**SCREEN:** Dashboard, Workflow Design, open Implement spec. Show that no gate exists. Add an approval
gate and anchor it to the Software Developer.

**VO:**
Open Workflow Design and find Implement spec. The default workflows have no gate configured. You add
one wherever you want a human decision.

Add an approval gate and anchor it to the Software Developer. A gate always belongs to an agent in the
workflow, and the run pauses right after that agent finishes.

**SCREEN:** Checkpoint: the workflow shows a gate after the Software Developer.

## 1:30 Run it and review at the gate `[CHAPTER]`

**SCREEN:** Start Implement spec on `002-validate-book-input`. `[SPEED-UP]` while the architect and
developer run. The run status changes to `AWAITING_APPROVAL`.

**VO:**
Start the workflow on spec 002, validate book input. The architect and the developer run, and then the
run stops with the status awaiting approval.

**SCREEN:** Approval view with the list of changed files. Open the branch on GitHub next to it.

**VO:**
The dashboard shows the gate context, including the files the developer changed. Open the branch and
compare the diff with the acceptance criteria in the spec. Notice that the QA Engineer has not run yet.
Nothing continues until a person decides.

**SCREEN:** Decision table.

**VO:**
You have three choices. Accept: the run continues with the QA Engineer. Deny: the run ends. Or accept
with comments: the developer runs again with your feedback and its previous output, and then the gate
opens again.

## 3:00 Accept with comments `[CHAPTER]`

**SCREEN:** Type the comment: "Also add a test for an author longer than 100 characters." Submit.
`[SPEED-UP]` while the developer re-runs. The gate opens again. Review the diff for the new test. Accept.

**VO:**
Let us try accept with comments. I will ask for one more test: an author longer than 100 characters.

The developer runs again, now with my comment and its previous output. And the gate opens again. I can
see the new test in the diff, so this time I accept.

**SCREEN:** Run finishes. Show the approval audit trail with the decision and the comment.

**VO:**
The run finishes, and my decision, including the comment, is recorded in the approval audit trail.

## 4:00 The limits you must know `[CHAPTER]`

**SCREEN:** Four short bullet cards, one at a time.

**VO:**
Before you rely on this, know the limits.

Feedback loops cost time and money, because every comment re-runs the agent. The default maximum is
three loops per gate, and that is the only cost control.

Any signed-in user can approve. There is no role restriction on who may decide at a gate.

A job times out while waiting. A run on a project stops after the agent timeout, 3600 seconds locally,
even while a gate is open.

And runs that were executing during a restart are lost. Only runs parked at a gate resume.

If you see "run state lost", start the workflow again. If accepting returns a 409, someone else already
decided. Exactly one decision wins.

Next: policy as code, which controls what agents may do before a human is even involved.

**SCREEN:** Outro.

---

## Production notes

- **VERIFY:** gate anchoring UI wording, the `AWAITING_APPROVAL` label, and that the audit trail shows
  the comment.
- Capture the `409` only if you can reproduce it with two browser sessions. Otherwise just mention it.
