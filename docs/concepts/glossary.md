---
title: Glossary
description: Short definitions of the OpenJCockpit terms used across this site.
sidebar_position: 3
---

# Glossary

Short definitions. Each links to the product documentation, the single source of truth.

| Term                | Meaning                                                                                                                                                                                                                                            |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **A2A**             | Agent2Agent protocol. Agents served by a provider gateway such as LiteLLM, referenced as `a2a:<provider>:<agent>`. See [agents](https://github.com/OpenJCockpit/OpenJCockpit/blob/main/docs/readme/integrations/a2a-agents.md).                    |
| **Agent**           | A role-based AI agent with a model alias, instructions, skills, tools and guardrails. Local agents are Markdown files and are referenced as `local:<id>`.                                                                                          |
| **Agent catalogue** | The list of agents a workflow can use: local agents plus one section per A2A provider.                                                                                                                                                             |
| **Alias (model)**   | A name such as `agent-chat` that agents use instead of a model tag. LiteLLM maps it to an upstream model.                                                                                                                                          |
| **Approval gate**   | A human decision point inside a run: accept, deny or accept with comments. See [approval gates](https://github.com/OpenJCockpit/OpenJCockpit/blob/main/docs/readme/governance/approval-gates.md).                                                  |
| **Audit trail**     | Recorded policy decisions and approval decisions, stored as files in a Docker volume.                                                                                                                                                              |
| **Checkpoint**      | A commit made on the run's branch after each agent finishes.                                                                                                                                                                                       |
| **Fail closed**     | When a control cannot decide, such as OPA unreachable or a missing guardrail, the action is blocked rather than allowed.                                                                                                                           |
| **Guardrail**       | A check on LLM input and output, such as `pii-protection`.                                                                                                                                                                                         |
| **LiteLLM**         | The gateway between agents and models. It also serves agents over A2A and fronts the Git MCP server.                                                                                                                                               |
| **MCP**             | Model Context Protocol. How agents call tools such as the Git tools.                                                                                                                                                                               |
| **OPA**             | Open Policy Agent. Evaluates the Rego policy for workflow starts, agents and every tool call.                                                                                                                                                      |
| **Policy**          | OPA rules in `infrastructure/opa/policies/`. See [policy enforcement](https://github.com/OpenJCockpit/OpenJCockpit/blob/main/docs/readme/governance/policy-enforcement.md).                                                                        |
| **Project**         | A software project with its Git repository and credentials.                                                                                                                                                                                        |
| **Skill**           | A reusable instruction package for agents.                                                                                                                                                                                                         |
| **Spec**            | Markdown specification with requirements and acceptance criteria, stored in the project's `specs/` folder. See [spec-driven development](https://github.com/OpenJCockpit/OpenJCockpit/blob/main/docs/readme/workflows/spec-driven-development.md). |
| **Spec queue**      | A per-project queue that runs specs one at a time.                                                                                                                                                                                                 |
| **Tool**            | A capability an agent may call, granted server-side and checked on every call.                                                                                                                                                                     |
| **Workflow**        | An ordered chain of agents, optionally with approval gates.                                                                                                                                                                                        |
