---
title: "Policy as code: a rule that blocks an agent"
description: "Video script: Policy as code: a rule that blocks an agent."
sidebar_position: 6
---

# 5. Policy as code: a rule that blocks an agent (6 minutes)

Tutorial: `docs/tutorials/policy-as-code.mdx` · Downloads: `downloads/policy/` (rego, tests,
`blocked-input.json`, `BLOCKED_RUN_WALKTHROUGH.md`).

**Goal:** add one rule (the QA Engineer may read but never change the repository), test it, and see the
decision that blocks a tool call.

**Before recording:** OPA 0.70.0 image pulled, the `downloads/policy` folder in a clean terminal
directory, a stack run so you know the real `agentId` in the decision log.

## Chapters

- 0:00 What you will build
- 0:40 What OPA is asked
- 1:50 Read the example rule
- 3:00 Run the tests
- 3:50 Ask for a decision
- 4:40 Try it in the stack
- 5:20 What just happened, and limits

---

## 0:00 What you will build `[CHAPTER]`

**SCREEN:** Version card ("Rule and tests verified with OPA 0.70.0"). Title: "A rule that blocks an
agent".

**VO:**
You will extend OpenJCockpit's default OPA policy with one rule: the QA Engineer agent may read the
repository, but never change it. You will test the rule, and then see it block a tool call.

You need Docker, a checkout of OpenJCockpit, and the policy files from the site's downloads. The last
step needs the running stack.

## 0:40 What OPA is asked `[CHAPTER]`

**SCREEN:** Animate the decision flowchart: tool call → identifiers present? → forbidden operation? →
known tool family? → allow.

**VO:**
OPA is asked for a decision on workflow starts, agents, skills, and every single tool call. Each
decision returns whether it is allowed, a reason, whether approval is required, a risk level, and audit
tags.

The default policy evaluates rules top to bottom, and the first match wins. No workflow id or customer
id: deny. A forbidden operation like force push, reset or rebase: deny. A tool outside the known git
family: deny. Otherwise: allow.

That is a starting point, not final governance logic. Replace it with your organization's rules.

## 1:50 Read the example rule `[CHAPTER]`

**SCREEN:** Editor showing the new Rego branch and its helper, highlighting `qa_write_attempt`, the
write operations set, and the `auditTags`.

```rego
write_operations := {"write_file", "commit", "push", "create_branch"}

qa_write_attempt {
	tool_call
	is_string(input.agentId)
	endswith(lower(input.agentId), "qa-engineer")
	write_operations[tool_operation]
}
```

**VO:**
The downloadable file is the default policy plus one branch, placed before the restricted-project rule.

The helper says: this is a tool call, the agent id ends with qa-engineer, and the operation is one of
write file, commit, push, or create branch. When that matches, the decision is: not allowed, with a
reason that names the agent and the tool, a high risk level, and the audit tags guardrail and qa
read-only.

## 3:00 Run the tests `[CHAPTER]`

**SCREEN:** Terminal.

```bash
cd downloads/policy
docker run --rm -v "$PWD:/p:ro" openpolicyagent/opa:0.70.0 test /p -v
```

**VO:**
Run the tests with the OPA container. You want to see 15 of 15 passing: the 12 default tests, and 3 for
the new rule.

**SCREEN:** Checkpoint: `PASS: 15/15`.

## 3:50 Ask for a decision `[CHAPTER]`

**SCREEN:**

```bash
docker run --rm -v "$PWD:/p:ro" openpolicyagent/opa:0.70.0 \
  eval -d /p/workflow_decision.rego -i /p/blocked-input.json \
  'data.openjcockpit.workflow.decision' --format pretty
```

**VO:**
Now ask for a real decision, with an input where the QA Engineer tries to write a file.

**SCREEN:** Zoom on the output: `"allowed": false`, tags `guardrail`, `qa-read-only`.

**VO:**
Allowed is false, and the audit tags are right there. That is your guardrail, proven without starting
the whole stack.

## 4:40 Try it in the stack `[CHAPTER]`

**SCREEN:** Copy the file over `infrastructure/opa/policies/workflow_decision.rego`, then:

```bash
docker compose restart opa
docker compose logs opa
```

**VO:**
To see it live, copy the file over the default policy and restart OPA. Policies are mounted as plain
files, so a restart is enough. Run a workflow and read the OPA log.

One tip: check the real agent id in the decision log first. The rule matches ids that end in
qa-engineer, so if your id looks different, your rule will never fire.

**VERIFY:** this live-stack step is not yet verified in the tutorial. Record it only if it works, and
otherwise cut this chapter and keep the tip as VO over the log.

## 5:20 What just happened, and limits `[CHAPTER]`

**SCREEN:** Four short bullet cards.

**VO:**
You changed behaviour by editing a file, not Java code. Every tool call goes through a policy-guarded
path, and decisions are written to the decision log.

Know the limits. With OPA disabled, every decision is allowed. Production runs with fail-closed
enforcement. The default policy is permissive. Tool-call input does not carry a project classification,
so rules on project classification do not fire for tool calls. And audit records are files in a Docker
volume, not a tamper-evident store.

Next: why agents never see your Git credentials.

**SCREEN:** Outro.

---

## Production notes

- If all agent tool calls are denied in the stack, the cause is a missing workflow id or customer id:
  start agents through a workflow.
- Do not claim the audit trail is tamper-proof. The limit is required on screen.
