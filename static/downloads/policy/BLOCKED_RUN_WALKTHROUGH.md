# Blocked run walkthrough

Shows a policy denial without needing the full stack. Run from the folder that holds these files.

## 1. Run the policy tests (15 should pass)

```bash
docker run --rm -v "$PWD:/p:ro" openpolicyagent/opa:0.70.0 test /p -v
```

## 2. Ask for a decision on a blocked tool call

`blocked-input.json` is a tool call by the QA Engineer agent to write a file.

```bash
docker run --rm -v "$PWD:/p:ro" openpolicyagent/opa:0.70.0 \
  eval -d /p/workflow_decision.rego -i /p/blocked-input.json \
  'data.openjcockpit.workflow.decision' --format pretty
```

Expected output (verified with OPA 0.70.0):

```json
{
  "allowed": false,
  "auditTags": ["guardrail", "qa-read-only"],
  "reason": "Agent 'a2a:litellm:qa-engineer' is read-only; tool 'git.write_file' changes the repository.",
  "requiredApproval": false,
  "riskLevel": "high"
}
```

## 3. Try it in the stack

1. Copy `workflow_decision.rego` over `infrastructure/opa/policies/workflow_decision.rego` in your
   OpenJCockpit checkout (keep a copy of the original).
2. `docker compose restart opa`
3. Run a workflow, then read the decisions: `docker compose logs opa`.

Check the `agentId` in the decision log first. The example rule matches agent ids ending in
`qa-engineer`.
