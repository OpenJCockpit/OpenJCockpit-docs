---
title: "Credential isolation in five minutes"
description: "Video script: Credential isolation in five minutes."
sidebar_position: 7
---

# 6. Credential isolation in five minutes

Tutorial: `docs/concepts/credential-isolation.mdx` · Concept piece, **no live demo**. Animated
diagrams with voice-over. Best for tech leads and security-minded viewers.

**Goal:** the viewer understands why an agent that can push code cannot leak the token it pushes with.

## Chapters

- 0:00 The problem
- 0:45 The idea: no credential in the call
- 1:45 The credential flow
- 2:45 Four guarantees
- 3:45 Related controls and limits

---

## 0:00 The problem `[CHAPTER]`

**SCREEN:** An agent icon with a key next to it, and a leak arrow towards an LLM cloud. Cross it out.

**VO:**
An agent that can push code must not be able to leak the token it pushes with. If the token is in the
prompt, it can end up in model output, in logs, or at a gateway.

OpenJCockpit solves this by making sure the token is never part of anything the model sees.

## 0:45 The idea: no credential in the call `[CHAPTER]`

**SCREEN:** A tool schema for `git_push`, with the fields listed. Show there is no username and no
token field.

**VO:**
No Git tool has a username or a token argument. The model can ask to push, but it cannot supply, read,
or repeat a credential, because none is in its prompts, its tools, or its outputs.

## 1:45 The credential flow `[CHAPTER]`

**SCREEN:** Animate the sequence diagram step by step. Agent (LLM), git-mcp-server, ai-control-service.

**VO:**
Here is how a push actually works. The agent calls git push, with no credentials in the call.

The git MCP server then asks the ai-control-service for the credentials of this workspace. That
endpoint is strict. It answers only to one Keycloak client, openjcockpit-git-mcp. It answers only while
the job is running. And it answers only for the repository of this job.

The credentials come back marked no-store and are never logged. The git MCP server pushes to the run's
branch, and returns just the result to the agent. The token never passes through the model.

## 2:45 Four guarantees `[CHAPTER]`

**SCREEN:** Table with four rows, revealed one by one.

**VO:**
Four guarantees.

Right caller only: any other client gets a 403.

Right time only: credentials are served only while the job runs.

Right repository only: any other repository gets a 404.

And no trace: the response is marked no-store, and the values are never logged.

The endpoint is also not part of the public API, and it is not reachable through the dashboard proxy,
which only forwards slash api. A workspace without a key is anonymous, and a key without credentials
fails closed.

## 3:45 Related controls and limits `[CHAPTER]`

**SCREEN:** Three cards (scope, policy, branch), then two limit cards with a lower third: **"Local
secrets are public examples. Local development only."**

**VO:**
Related controls reinforce this. The model does not choose the scope: Git tools use the run's
repository and workspace. Policy checks every tool call before it runs. And each run works on its own
branch, so even a misbehaving agent only touches a branch you review.

Be honest about the limits. Credentials in the workflow start input still exist for dashboard starts,
but jobs do not use them. And anyone who holds the git MCP client secret could request credentials, so
treat service client secrets like any other secret. The ones in the local setup are public examples.

Next, build your own agent.

**SCREEN:** Outro.

---

## Production notes

- Pure animation. Reuse the Mermaid sequence diagram exactly, so the video matches the page.
- Do not show a real token or a real client secret anywhere, even blurred.
- Keep the wording "never logged" and "never passes through the model" as in the tutorial. Do not
  strengthen it to "impossible to leak".
