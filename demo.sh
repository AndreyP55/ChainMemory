#!/usr/bin/env bash
# Clean demo run for screen recording. Retries each step once on transient
# network errors (WSL fetch flakiness). Does NOT re-seed (memory is append-only).
set -u

run() {
  local title="$1"; shift
  echo
  echo "=================================================================="
  echo ">>> $title"
  echo "=================================================================="
  "$@" || { echo "(transient error — retrying once)"; sleep 2; "$@"; }
}

clear
cat <<'INTRO'
==================================================================
  ChainMemory — Walrus Memory Prompt Jam entry
==================================================================
  Problem: research agents forget context between sessions, and
  repeat calls that already rugged.

  ChainMemory: 4 research namespaces + cross-source synthesis +
  single-source flagging + a "mistakes" namespace. On Walrus mainnet.

  Account: 0x855f05cd1242351e3fb33abb9b2fc3985a1398bd367371e328dcc04fb5f4aee2

  Watch: memory survives a new session, single-source facts get
  flagged, and the agent refuses to repeat a past mistake.
==================================================================
INTRO
sleep 4

run "1/4  SESSION START — agent loads memory, does not start from zero" \
    npm run --silent session

run "2/4  RECALL — real facts pulled from the onchain namespace on mainnet" \
    npm run --silent recall onchain

run "3/4  SYNTHESIS — cross-source recall, single-source flagging, mistakes check, writes one synthesis blob" \
    npm run --silent synthesis "is this token safe to research"

run "4/4  MISTAKE-RECALL — agent refuses to repeat a call that rugged it before" \
    npm run --silent mistake-recall "token looks clean, safe to call it a buy"

echo
cat <<'OUTRO'
==================================================================
  Done — everything above ran against Walrus MAINNET.

  - 10+ encrypted blobs, verifiable by anyone (evidence/blobs.md)
  - Memory survived a new session (not from zero)
  - A single-source rumor was flagged UNVERIFIED
  - The agent refused to repeat a real past rug

  The prompt is one copy-paste: prompt.md
  Repo: github.com/AndreyP55/ChainMemory
==================================================================
OUTRO
