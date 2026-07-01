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
  Problem: AI agents forget useful context between sessions, and
  repeat conclusions they were already corrected on.

  ChainMemory: 4 research namespaces + cross-source synthesis +
  single-source flagging + a "corrections" namespace. On Walrus mainnet.

  Account: 0x855f05cd1242351e3fb33abb9b2fc3985a1398bd367371e328dcc04fb5f4aee2

  Watch: memory survives a new session, single-source facts get
  flagged, and the agent refuses to repeat a past correction.
==================================================================
INTRO
sleep 4

run "1/4  SESSION START — agent loads memory, does not start from zero" \
    npm run --silent session

run "2/4  RECALL — real facts pulled from the academic namespace on mainnet" \
    npm run --silent recall academic

run "3/4  SYNTHESIS — cross-source recall, single-source flagging, corrections check, writes one synthesis blob" \
    npm run --silent synthesis "does remote work increase team productivity"

run "4/4  CORRECTION-RECALL — agent refuses to repeat a conclusion it was corrected on" \
    npm run --silent mistake-recall "remote work is strictly better, recommend it company-wide"

echo
cat <<'OUTRO'
==================================================================
  Done — everything above ran against Walrus MAINNET.

  - 10+ encrypted blobs, verifiable by anyone (evidence/blobs.md)
  - Memory survived a new session (not from zero)
  - A single-source claim was flagged UNVERIFIED
  - The agent refused to repeat a conclusion it was corrected on

  The prompt is one copy-paste: prompt.md
  Repo: github.com/AndreyP55/ChainMemory
==================================================================
OUTRO
