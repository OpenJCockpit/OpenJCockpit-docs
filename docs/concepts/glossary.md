---
title: Glossary
description: Short definitions of the OpenJCockpit terms used across this site.
sidebar_position: 3
---

# Glossary

Short definitions. Each links to the [reference](/reference), the single source of truth.

| Term                        | Meaning                                                                                                                                                                                                  |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **A2A**                     | Agent2Agent protocol. Agents served by a provider gateway such as LiteLLM, referenced as `a2a:<provider>:<agent>`. See [agents](/reference/integrations/a2a-agents).                                     |
| **Agent**                   | A role-based AI agent with a model alias, instructions, skills, tools and guardrails. Local agents are Markdown files and are referenced as `local:<id>`.                                                |
| **Agent catalogue**         | The list of agents a workflow can use: local agents plus one section per A2A provider.                                                                                                                   |
| **Alias (model)**           | A name such as `agent-chat` that agents use instead of a model tag. LiteLLM maps it to an upstream model.                                                                                                |
| **Approval gate**           | A human decision point inside a run: accept, deny or accept with comments. See [approval gates](/reference/governance/approval-gates).                                                                   |
| **Audit trail**             | Recorded policy decisions and approval decisions, stored as files in a Docker volume.                                                                                                                    |
| **Checkpoint**              | A commit made on the run's branch after each agent finishes.                                                                                                                                             |
| **Dashboard**               | The OpenJCockpit web UI (React, behind Keycloak login) where you pick a project, design and start workflows, follow runs and take approval decisions. Use "dashboard", not "AI Orchestration Dashboard". |
| **Embabel agent runtime**   | The service (`embabel-agent-runtime`) that executes configuration-driven agents and serves the inbound A2A endpoints. Tenant bindings, workflow runs and OPA decisions stay in `embabel-agent-service`.  |
| **Fail closed**             | When a control cannot decide, such as OPA unreachable or a missing guardrail, the action is blocked rather than allowed.                                                                                 |
| **Git workspace**           | The per-run clone of the project repository that agents read and write through the Git MCP server, on a branch created for that run.                                                                     |
| **Guardrail**               | A check on LLM input and output, such as `pii-protection`.                                                                                                                                               |
| **Keycloak**                | The identity provider. It issues the JWTs that the dashboard and services use, including the `tenant_id` claim.                                                                                          |
| **LiteLLM**                 | The gateway between agents and models. It also serves agents over A2A and fronts the Git MCP server.                                                                                                     |
| **MCP**                     | Model Context Protocol. How agents call tools such as the Git tools.                                                                                                                                     |
| **Mock Skills Marketplace** | The development-only stand-in for an external Skills Marketplace, enabled by an opt-in Compose file. Not for deployed environments.                                                                      |
| **OPA**                     | Open Policy Agent. Evaluates the Rego policy for workflow starts, agents and every tool call.                                                                                                            |
| **OpenJCockpit**            | The product. Tagline: "the open-source AI Software Factory" for governed agentic software development.                                                                                                   |
| **Policy**                  | OPA rules in `infrastructure/opa/policies/`. See [policy enforcement](/reference/governance/policy-enforcement).                                                                                         |
| **Project**                 | A software project with its Git repository and credentials.                                                                                                                                              |
| **Skill**                   | A reusable instruction package for agents.                                                                                                                                                               |
| **Skills Hub**              | The dashboard area where you browse skills and register Skills Marketplace connections.                                                                                                                  |
| **Skills Marketplace**      | An external skills catalogue that the Skills Hub can connect to. The integration is early: placeholder contract, development-only mock.                                                                  |
| **Spec**                    | Markdown specification with requirements and acceptance criteria, stored in the project's `specs/` folder. See [spec-driven development](/reference/workflows/spec-driven-development).                  |
| **Spec queue**              | A per-project queue that runs specs one at a time.                                                                                                                                                       |
| **Tenant**                  | The customer or organisation an agent run belongs to, taken from the JWT claim `tenant_id` and matched against the tenant binding.                                                                       |
| **Tool**                    | A capability an agent may call, granted server-side and checked on every call.                                                                                                                           |
| **Workflow**                | An ordered chain of agents, optionally with approval gates.                                                                                                                                              |
