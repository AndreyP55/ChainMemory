# ChainMemory

### A disciplined long-term memory agent for Walrus Memory.

Built for the [Walrus Protocol](https://memory.walrus.xyz/) **Memory Prompt Jam** (Sessions 5).

The jam asks for a prompt that makes an agent decide **what is worth remembering
and when** — its seed example: research a topic in four namespaces, recall across
all four, surface what only one source confirmed, and store one synthesis.

**ChainMemory implements that example directly**, then adds the discipline that
makes memory trustworthy: it flags single-source claims, refuses to repeat a
conclusion it was corrected on, and never stores secrets.

---

## Exactly what the brief asked for

This is a 1:1 mapping to the jam's seed example — the foundation of the agent:

| Jam requirement (from @WalrusProtocol) | Where it's done in ChainMemory |
|---|---|
| "researches a topic in four passes, each in its own namespace" | `academic` / `industry` / `contrarian` / `raw-data` — 4 passes, 4 namespaces (`prompt.md`) |
| "recalls across all four" | Synthesis pass step 1: `memwal_recall` across all four namespaces |
| "surfaces what only one source turned up" | Synthesis pass step 3: single-source facts flagged **SINGLE-SOURCE / UNVERIFIED** |
| "stores just the best synthesis" | Synthesis pass step 5: one distilled note written to `synthesis` (raw passes never stored) |
| "the agent knows what's worth remembering and when to write it" | WRITE RULES: (a) load-bearing, (b) non-obvious, (c) reusable + dedupe + merge + skip secrets |
| "Build your version." | A `corrections` namespace (never repeat a corrected conclusion) + a security rule |

---

## The problem (who, what, how often)

AI agents either forget useful context between sessions or store too much
irrelevant and sensitive information. This hurts developers, teams, and power
users on long-running work, where preferences, decisions, constraints, and past
mistakes need to survive across sessions and tools. It happens **every session**.
ChainMemory turns Walrus Memory into a disciplined layer: it recalls what's
relevant, remembers only durable facts, merges changed decisions, flags
unverified claims, refuses to repeat corrected conclusions, and skips noise and
secrets.

---

## How it works

```
topic ──► 4 research passes ──► academic / industry / contrarian / raw-data
                                        │
                                cross-namespace recall
                                        │
                    ┌───────────────────┼───────────────────┐
              agreement (2+)     single-source (flagged)   corrections check
                    │                                          │
                    └──────────────► one synthesis note ◄──────┘
                                        │
                              Walrus mainnet (encrypted, portable)
```

- **Write path** — each research pass writes load-bearing, deduped facts to its namespace; secrets are never stored.
- **Read path** — synthesis pass recalls across all namespaces, flags single-source facts, checks `corrections` before concluding.
- **Session start** — recalls `synthesis` + `corrections` so research continues instead of restarting.

The demo instantiates this on one general research question
("Does remote work increase team productivity?"), but the prompt is
domain-agnostic — swap the topic and the same discipline applies.

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
npm run session         # session start: loads synthesis + corrections, not from zero
npm run synthesis "does remote work increase team productivity"   # cross-source + single-source flagging
npm run mistake-recall "remote work is strictly better, recommend it company-wide"   # negative-knowledge guard
npm run recall academic  # inspect any namespace directly
```

| Script | What it shows |
|---|---|
| `npm run seed` | Writes the demo memories across all six namespaces to mainnet |
| `npm run session` | Loads `synthesis` + `corrections` at session start |
| `npm run synthesis` | Recalls across the 4 research namespaces, flags single-source facts, checks corrections, stores one synthesis |
| `npm run mistake-recall` | Holds back a draft conclusion that matches a past correction |
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
    ├── session.js         # session-start briefing (synthesis + corrections)
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
