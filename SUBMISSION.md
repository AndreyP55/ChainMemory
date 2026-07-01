# Submission — ChainMemory

**Prompt:** see [`prompt.md`](prompt.md) (copy-pasteable, works in any MCP client with the `memwal` tools).

**Agent ID:** `<fill in your Walrus Memory accountId after memwal_login>`

**Problem statement (2–5 sentences):**
Crypto researchers re-research the same token from scratch every session — chain
data, influencer signals, and narrative all vanish when the chat ends. Worse, the
agent has no memory of past bad calls, so it repeats a "safe" verdict on a token
that already rugged. ChainMemory gives the agent four research namespaces plus a
`mistakes` namespace: it recalls across all sources, flags anything only one source
confirmed, stores a single distilled synthesis, and refuses to repeat a pattern
that burned it before. This is the seed example the jam asked for, instantiated
for the one domain where "remembering what went wrong" is worth real money.

**Demo video:** `<Walrus URL after upload>`

**Namespaces used:** `onchain`, `social`, `narrative`, `raw-data`, `synthesis`, `mistakes`
