---
title: "Build a custom agent in ten minutes"
description: "Video script: Build a custom agent in ten minutes."
sidebar_position: 8
---

# 7. Build a custom agent in ten minutes

Tutorial: `docs/tutorials/custom-agent.mdx` · Download: `downloads/agents/code-reviewer.md` · Demo
spec: `002-validate-book-input`.

**Goal:** write a read-only Code Reviewer agent as one Markdown file, see it in the catalogue, add it to
a workflow after the QA Engineer, and run it.

**Before recording:** running stack, the OpenJCockpit checkout on disk, finished approval gates (you
should be comfortable in Workflow Design).

## Chapters

- 0:00 What you will build
- 0:40 Write the agent in Markdown
- 3:30 Find it in the catalogue
- 4:30 Add it to a workflow
- 5:30 Run it on spec 002
- 8:00 Why this is safe, and where it goes next

---

## 0:00 What you will build `[CHAPTER]`

**SCREEN:** Version card. Flow: Architect → Developer → QA → **Code Reviewer (new)**.

**VO:**
You will write a Code Reviewer agent as one Markdown file, see it appear in the agent catalogue, and add
it to a workflow after the QA Engineer. It reads the change and reports findings, and it cannot change
any file.

You need the running stack, and a checkout of OpenJCockpit, because local agents live in its agents
folder.

## 0:40 Write the agent in Markdown `[CHAPTER]`

**SCREEN:** Editor, new file `agents/code-reviewer.md`. Type or paste in stages: front matter first.

```markdown
---
id: code-reviewer
name: "Code Reviewer"
version: "1.0.0"
description: "Reviews a change against its spec and reports findings without changing code"
model: agent-chat
guardrails:
  - pii-protection
tools:
  - git.list_files
  - git.read_file
---
```

**VO:**
An agent is one Markdown file: YAML front matter, then the instructions.

The id is required, lowercase kebab-case, and unique in the folder. The version is required. The model
is a configured model alias, and agent-chat is the one the seeded agents use.

The guardrails list turns on PII protection, which checks the model input and output and fails closed.

And look at the tools list. Only two: list files and read file. That is the control that makes this
agent read-only.

**SCREEN:** Now the instructions section.

```markdown
# Role

You are a Code Reviewer in a software delivery team.

# Rules

- You are read-only. Never write or change files.
```

**VO:**
Below the front matter go the instructions: the role and the rules. The download has the full text,
including how to report findings tied to the acceptance criteria and finish with approve or changes
requested.

## 3:30 Find it in the catalogue `[CHAPTER]`

**SCREEN:** Dashboard: Workflow design → Agents → Local.

**VO:**
The agents folder is mounted read-only into the container, so there is nothing to deploy. Open Workflow
design, Agents, Local.

**SCREEN:** Checkpoint: Code Reviewer listed with reference `local:code-reviewer`. (Optionally show an
invalid file listed with its problem.)

**VO:**
There it is, with the reference local colon code-reviewer. An invalid file is still listed, marked with
the problem, so mistakes are easy to spot.

## 4:30 Add it to a workflow `[CHAPTER]`

**SCREEN:** Copy Implement spec, add `local:code-reviewer` after the QA Engineer, save under a new name.

**VO:**
In Workflow Design, copy Implement spec and add the Code Reviewer after the QA Engineer. Save it under a
new name so the defaults stay untouched.

## 5:30 Run it on spec 002 `[CHAPTER]`

**SCREEN:** Start the new workflow on `002-validate-book-input`. `[SPEED-UP]`. Open the reviewer's output.

**VO:**
Start your workflow on spec 002. This takes a while on a local model, so I sped it up.

**SCREEN:** Reviewer output: findings tied to acceptance criteria, ending with `APPROVE` or
`CHANGES REQUESTED`. Then the run branch's commit list with no reviewer commit.

**VO:**
The reviewer's output lists findings tied to the acceptance criteria and ends with a verdict. And the
run's branch has no commit from the reviewer that changes files.

## 8:00 Why this is safe, and where it goes next `[CHAPTER]`

**SCREEN:** Diagram: agent definition tools ∩ tenant binding allowlist → checked again at call time,
including by OPA. Strike through the "you are read-only" prompt line.

**VO:**
Here is the key point. Tool access is granted on the server side. It needs both the agent definition
and the tenant binding's allowlist, and every call is checked again at call time, including by OPA. Text
in the instructions never grants a tool.

That is why "you are read-only" in the prompt is a request. Leaving the write tool out of the tools list
is the control.

From here you can add a policy rule like the one in the policy video, or serve agents from another
provider over the Agent2Agent protocol. Be aware of the limits: A2A support is version 0.3 and message
send only, and the agents folder is read-only inside the container, so edit files on the host.

If the agent cannot read files, the tool must also be allowed by the tenant binding. Check the OPA log.

**SCREEN:** Outro: "Next: Bring your own model".

---

## Production notes

- The tutorial and its video are titled "ten minutes". If the real run is longer, trim waiting with
  `[SPEED-UP]` rather than renaming.
- **VERIFY:** the catalogue path, the reference format `local:code-reviewer`, and the tenant binding
  behaviour on a clean stack.
