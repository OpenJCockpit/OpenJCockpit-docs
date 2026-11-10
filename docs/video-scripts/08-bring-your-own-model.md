---
title: "Bring your own model"
description: "Video script: Bring your own model."
sidebar_position: 9
---

# 8. Bring your own model (5 minutes)

Tutorial: `docs/tutorials/bring-your-own-model.mdx`

**Goal:** switch the local Ollama model all agents use by changing one variable, prove the change
reached the gateway, and understand why a hosted model is not a one-line change.

**Before recording:** running stack, a second Ollama model already pulled (say so on screen), a clean
`.env`.

## Chapters

- 0:00 What you will build
- 0:30 How models are wired
- 1:30 Pull and set the model
- 2:30 Recreate and prove it
- 3:30 What about a hosted model?
- 4:30 What just happened

---

## 0:00 What you will build `[CHAPTER]`

**SCREEN:** Version card.

**VO:**
You will point all agents at a different local Ollama model by changing one variable, and check that the
change reached the gateway. And you will learn why using a hosted model is not a one-line change.

You need the running stack and a second model that fits your hardware.

## 0:30 How models are wired `[CHAPTER]`

**SCREEN:** Animate the diagram: Agent `model: agent-chat` → embabel-agent-runtime → LiteLLM gateway →
Ollama on the host (`OLLAMA_MODEL`). Dotted line: best/cheapest and embeddings → OpenAI API.

**VO:**
Agents never name a model directly. They name an alias, such as agent-chat, and the LiteLLM gateway maps
each alias to an upstream model.

In the LiteLLM config, every alias reads the same variable, OLLAMA_MODEL. So one change moves all of
them.

The dotted line is the catch: the best and cheapest aliases and the embeddings still go to OpenAI. That
is why the stack needs an OpenAI key to boot.

## 1:30 Pull and set the model `[CHAPTER]`

**SCREEN:** Terminal, then `.env`.

```bash
ollama pull <model-tag>
ollama list
```

```bash
OLLAMA_MODEL=<model-tag>
```

**VO:**
Pull the new model, and check it is listed. Then set OLLAMA_MODEL in your env file. The value must exist
in ollama list.

## 2:30 Recreate and prove it `[CHAPTER]`

**SCREEN:**

```bash
docker compose up -d litellm embabel-agent-runtime
docker compose exec litellm env | grep OLLAMA_MODEL
```

**VO:**
Recreate the two services that use the variable. Then do not trust that your env file did what you
meant: ask the container.

**SCREEN:** Output shows the new tag. Checkpoint overlay. Then a quick small workflow run (`[SPEED-UP]`)
with the agents answering.

**VO:**
The output shows my new tag. Now run a small workflow and confirm the agents answer. Expect different
speed and quality from the previous model.

## 3:30 What about a hosted model? `[CHAPTER]`

**SCREEN:** Two cards, "Gateway has no OpenAI key" and "Fallback bypasses the gateway".

**VO:**
What about a hosted model? It is not a one-line change in the current stack, for two reasons.

First, the LiteLLM container deliberately has no OpenAI key. Routing an alias to a hosted model means
changing the compose file and the config, and deciding where that key may live.

Second, the documented fallback to OpenAI bypasses the gateway and its PII filter. And in the current
compose file, the env file alone does not appear to reach the runtime container, so verify with docker
compose exec first.

So treat a hosted variant as a separate tutorial, once it has been tried and verified.

## 4:30 What just happened `[CHAPTER]`

**VO:**
You changed which model answers without touching any agent. That is the point of aliases. It also means
a weaker model changes every agent at once, so re-run your specs and review the branches the same way.

Common snags: every run fails after the change because the tag is not in ollama list or the daemon
stopped, and health stays up either way. Don't set OLLAMA_BASE_URL to localhost, because inside the
container nothing listens there. And on Linux, binding Ollama to all interfaces exposes an
unauthenticated endpoint, so prefer a narrower bind or a firewall rule.

That is all eight pieces. Read the glossary, and revisit the policy video to govern your new agent.

**SCREEN:** Outro: link to glossary and site.

---

## Production notes

- Use a model tag that exists on your machine, and show it on screen instead of the `<model-tag>`
  placeholder.
- Do not demo a hosted model. The tutorial explicitly defers it.
- **VERIFY:** the `docker compose exec embabel-agent-runtime env` claim before saying it on camera.
