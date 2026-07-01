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
echo "ChainMemory — live demo against Walrus mainnet"
echo "Account: 0x855f05cd1242351e3fb33abb9b2fc3985a1398bd367371e328dcc04fb5f4aee2"

run "1/4  SESSION START — agent loads memory, does not start from zero" \
    npm run --silent session

run "2/4  RECALL — real facts pulled from the onchain namespace on mainnet" \
    npm run --silent recall onchain

run "3/4  SYNTHESIS — cross-source recall, single-source flagging, mistakes check, writes one synthesis blob" \
    npm run --silent synthesis "is this token safe to research"

run "4/4  MISTAKE-RECALL — agent refuses to repeat a call that rugged it before" \
    npm run --silent mistake-recall "token looks clean, safe to call it a buy"

echo
echo "=================================================================="
echo ">>> Done. 10+ encrypted blobs on Walrus mainnet — see evidence/blobs.md"
echo "=================================================================="
