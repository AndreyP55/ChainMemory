# MemoryScout

### A research agent that never starts from zero — and never repeats a call that burned it.

Built for the [Walrus Protocol](https://memory.walrus.xyz/) **Memory Prompt Jam** (Sessions 5).

MemoryScout researches any topic in four passes — each in its own Walrus Memory
namespace — then recalls across all of them, flags anything only a single source
confirmed, and stores one distilled synthesis. On top of that, it keeps a
`mistakes` namespace so it never repeats a conclusion that was wrong before.

---

## Exactly what the brief asked for

The jam's seed example was explicit. Here is a 1:1 mapping to this submission:

| Jam requirement (from @WalrusProtocol) | Where it's done in MemoryScout |
|---|---|
| "researches a topic in four passes, each in its own namespace" | `onchain` / `social` / `narrative` / `raw-data` — 4 passes, 4 namespaces (see `prompt.md`) |
| "recalls across all four" | Synthesis pass step 1: `memwal_recall` across all four namespaces |
| "surfaces what only one source turned up" | Synthesis pass step 3: single-source facts flagged **SINGLE-SOURCE / UNVERIFIED** |
| "stores just the best synthesis" | Synthesis pass step 5: one distilled note written to `synthesis` (raw passes never stored) |
| "the agent knows what's worth remembering and when to write it" | Explicit WRITE RULES: (a) load-bearing, (b) non-obvious, (c) reusable + dedupe before write |
| "Build your version." | Crypto-research instantiation + a `mistakes` namespace for negative knowledge |

---

## The problem (who, what, how often)

Crypto researchers and alpha hunters re-research the same token every session.
The chain data, the influencer signals, the narrative — all of it lives in a
throwaway chat that disappears when the session ends. Worse: the agent that told
you a token was safe last week has no memory of the rug that followed, so it will
happily give you the same green light again. This happens **every single session**,
to anyone doing serious research with an AI agent.

MemoryScout fixes both halves: persistent research memory **and** persistent
memory of what was wrong.

---

## How it works

```
topic ──► 4 research passes ──► onchain / social / narrative / raw-data (namespaces)
                                        │
                                cross-namespace recall
                                        │
                    ┌───────────────────┼───────────────────┐
              agreement (2+)     single-source (flagged)   mistakes check
                    │                                          │
                    └──────────────► one synthesis note ◄──────┘
                                        │
                              Walrus mainnet (encrypted, portable)
```

- **Write path** — each research pass writes load-bearing, deduped facts to its namespace.
- **Read path** — synthesis pass recalls across all namespaces, flags single-source facts,
  checks `mistakes` before concluding.
- **Session start** — recalls `synthesis` + `mistakes` so research continues instead of restarting.

---

## The prompt

Copy-pasteable system prompt for any MCP client: see [`prompt.md`](prompt.md).

---

## Verification

Real memories on Walrus mainnet — blob IDs listed in [`evidence/blobs.md`](evidence/blobs.md).

---

## Built with

- [Walrus Memory](https://memory.walrus.xyz/) — encrypted, portable agent memory
- [MemWal MCP](https://github.com/MystenLabs/MemWal) — `@mysten-incubation/memwal-mcp`
- [Walrus](https://walrus.xyz) — decentralized storage on Sui

## License

MIT
</content>
