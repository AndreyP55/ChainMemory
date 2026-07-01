# ChainMemory

### A research agent that never starts from zero — and never repeats a call that burned it.

Built for the [Walrus Protocol](https://memory.walrus.xyz/) **Memory Prompt Jam** (Sessions 5).

ChainMemory researches any topic in four passes — each in its own Walrus Memory
namespace — then recalls across all of them, flags anything only a single source
confirmed, and stores one distilled synthesis. On top of that, it keeps a
`mistakes` namespace so it never repeats a conclusion that was wrong before.

---

## Exactly what the brief asked for

The jam's seed example was explicit. Here is a 1:1 mapping to this submission:

| Jam requirement (from @WalrusProtocol) | Where it's done in ChainMemory |
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

ChainMemory fixes both halves: persistent research memory **and** persistent
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
Two ways to use ChainMemory:

1. **As a prompt** — paste `prompt.md` into any MCP client with the Walrus Memory
   (`memwal`) tools connected. This is the jam deliverable.
2. **As runnable scripts** — the `src/` directory demonstrates and verifies the
   exact behavior against Walrus mainnet, so anyone can reproduce it.

---

## Quick start (verify it yourself)

```bash
git clone https://github.com/AndreyP55/ChainMemory.git
cd ChainMemory
npm install

# Get credentials at https://memory.walrus.xyz (connect Sui wallet), then:
cp .env.example .env      # fill MEMWAL_PRIVATE_KEY + MEMWAL_ACCOUNT_ID

npm run seed            # write the demo research to Walrus mainnet (prints blob IDs)
npm run session         # session start: loads synthesis + mistakes, not from zero
npm run synthesis "is this token safe"   # cross-source recall + single-source flagging
npm run mistake-recall "token looks clean, safe to call"   # negative-knowledge guard
npm run recall onchain  # inspect any namespace directly
```

| Script | What it shows |
|---|---|
| `npm run seed` | Writes the 9 demo memories across all six namespaces to mainnet |
| `npm run session` | Loads `synthesis` + `mistakes` at session start |
| `npm run synthesis` | Recalls across the 4 research namespaces, flags single-source facts, checks mistakes, stores one synthesis |
| `npm run mistake-recall` | Holds back a draft conclusion that matches a past mistake |
| `npm run recall <ns>` | Raw recall from any namespace |

## Project structure

```
ChainMemory/
├── prompt.md              # the system prompt (copy-pasteable) — jam deliverable
├── README.md              # this file
├── SUBMISSION.md          # problem statement + agent ID + demo link
├── package.json           # npm scripts
├── .env.example           # credentials template
├── evidence/
│   └── blobs.md           # real Walrus mainnet blob IDs
└── src/
    ├── client.js          # shared MemWal client + namespaces + demo dataset
    ├── seed.js            # writes research memories to mainnet
    ├── recall.js          # inspect a single namespace
    ├── session.js         # session-start briefing (synthesis + mistakes)
    ├── synthesis.js       # cross-namespace synthesis + single-source flagging
    └── mistake-recall.js  # negative-knowledge guard
```

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
