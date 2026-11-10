---
title: "Quickstart: zero to a running dashboard"
description: "Video script: Quickstart: zero to a running dashboard."
sidebar_position: 3
---

# 2. Quickstart: zero to a running dashboard (7 minutes)

Tutorial: `docs/getting-started/quickstart.mdx` · Highest-value piece: anyone who cannot get it running
never sees the rest.

**Goal:** from a clean machine to the signed-in hub with the Business and Implementation portals.

**Before recording:** clean machine or clean Docker state, `ollama pull` already done once so the video
does not wait on a download (say so), throwaway `OPENAI_API_KEY` in `.env`, ports free.

## Chapters

- 0:00 What you will build
- 0:30 Prerequisites
- 1:30 Pull the model
- 2:00 Clone and configure
- 3:00 Start the backend
- 4:30 Start the dashboard
- 5:15 Sign in
- 6:15 Pull the job image
- 6:40 Next steps

---

## 0:00 What you will build `[CHAPTER]`

**SCREEN:** Version card ("Tested on commit `<sha>`"), then the end state: the hub with the Business
and Implementation portals.

**VO:**
In this video you will run the complete OpenJCockpit stack on your own machine and sign in to the AI
Orchestration Dashboard. At the end, you will see the hub with the Business and Implementation portals.

This demo uses a local model, qwen3.6 27b, through Ollama. Output from a local model varies from run to
run, so yours may differ in detail.

## 0:30 Prerequisites `[CHAPTER]`

**SCREEN:** Checklist appears, one item per line, as the VO mentions it.

**VO:**
You need Docker with Docker Compose. You need Ollama installed on the host, not in Docker, and enough
memory for a large model. You need Git, to clone two repositories side by side.

And you need an OpenAI API key. This surprises people: it is mandatory to boot the stack, because the
best and cheapest model aliases and the embeddings are still OpenAI-hosted. Use a throwaway key for
tutorials.

Finally, these host ports must be free: 4000, 4403 to 4406, 4100, 8080, 8091, 9080 and 8181.

## 1:30 Pull the model `[CHAPTER]`

**SCREEN:** Terminal, large font.

```bash
ollama pull qwen3.6:27b
ollama list
```

**VO:**
First, pull the model and check it is listed. Keep the Ollama daemon running for as long as the stack is
up. I already pulled it before recording, so this is quick.

**SCREEN:** Checkpoint overlay: "`ollama list` shows `qwen3.6:27b`".

## 2:00 Clone and configure `[CHAPTER]`

```bash
git clone https://github.com/OpenJCockpit/OpenJCockpit.git
git clone https://github.com/OpenJCockpit/OpenJCockpit-frontend.git
cd OpenJCockpit
cp .env.example .env
```

**VO:**
Clone both repositories next to each other, then copy the example environment file.

**SCREEN:** Open `.env` in an editor. Only the `OPENAI_API_KEY` line is visible, with the value
**blurred or a dummy**.

**VO:**
Set your OpenAI key. Every other variable in the file is commented out and has a working local default.
Never commit this file.

## 3:00 Start the backend `[CHAPTER]`

```bash
docker compose up --build
```

**SCREEN:** Build output scrolls. `[SPEED-UP]` the build. Pause on the one-shot `local-seed` container
exiting with code 0.

**VO:**
Now start the backend. The first build takes a while, so I sped this up.

Watch for the local-seed container. It runs once, prepares the Keycloak roles, the local users and the
LiteLLM keys, and then exits. It is safe to run again.

**SCREEN:** Checkpoint overlay: "Build finished, `local-seed` exited successfully". Then a caution box:
"Health is not readiness for inference".

**VO:**
One warning. The health endpoint reports up even when Ollama is unreachable. A missing model only shows
up when the first LLM call fails. If that happens, the troubleshooting page has the answer.

## 4:30 Start the dashboard `[CHAPTER]`

Second terminal:

```bash
cd OpenJCockpit-frontend
docker compose up --build
```

**VO:**
In a second terminal, start the dashboard. It is a separate application. It proxies API calls to the
ai-control-service on port 9080 and signs in against Keycloak on port 8080.

## 5:15 Sign in `[CHAPTER]`

**SCREEN:** Browser at `http://localhost:4000`, redirect to the login page. Lower third: **"Seeded
users: local development only."** Sign in as `tony`.

**VO:**
Open localhost 4000. You are redirected to the login page. Sign in with a seeded local user. I will use
tony, who also has the admin role. These seeded users exist for local development only. Never use them
anywhere else.

**SCREEN:** Hub appears. Checkpoint overlay: greeting with first name, top bar, Business and
Implementation portals.

**VO:**
And there is the hub: a greeting, a top bar, and the Business and Implementation portals.

## 6:15 Pull the job image `[CHAPTER]`

```bash
docker pull eclipse-temurin:25-jre
```

**VO:**
One last step. Workflow runs on a project use a container image that is not pulled automatically, so
pull it once now.

## 6:40 What just happened and next steps `[CHAPTER]`

**SCREEN:** Simple diagram: Keycloak, PostgreSQL, LiteLLM, OPA, Java services in Docker; dashboard and
Ollama outside, talking over host ports.

**VO:**
Docker Compose started identity, the database, the LiteLLM gateway, the policy engine, and the Java
services. Ollama serves the model for every agent.

To stop: docker compose stop keeps your state. Docker compose down keeps the volumes. But docker compose
down with the dash v flag deletes the realm, the databases and the keys. Only use it for a full reset.

Next up: your first spec-driven change on the demo project.

**SCREEN:** Outro card.

---

## Production notes

- Show real snags only if they occurred while recording: OpenAI key missing, Ollama not running, port
  clash. Link to the troubleshooting page in the description.
- Description chapters = the headings above.
- **VERIFY:** port list, the `local-seed` behaviour and the `eclipse-temurin:25-jre` image on a clean
  machine, since the tutorial is still marked unverified.
