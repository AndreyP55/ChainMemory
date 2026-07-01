# Submission — ChainMemory

**Prompt:** see [`prompt.md`](prompt.md) (copy-pasteable, works in any MCP client with the `memwal` tools).

**Agent ID:** `0x855f05cd1242351e3fb33abb9b2fc3985a1398bd367371e328dcc04fb5f4aee2`
(encrypted blobs on Walrus mainnet — see [`evidence/blobs.md`](evidence/blobs.md))

**Problem statement (2–5 sentences):**
AI agents either forget useful context between sessions or store too much
irrelevant and sensitive information. This is painful for developers, teams, and
power users on long-running work, where preferences, decisions, constraints, and
past mistakes need to survive across sessions and tools. ChainMemory turns Walrus
Memory into a disciplined layer: it researches a topic across four namespaces,
recalls across all of them, flags anything only one source confirmed, refuses to
repeat a conclusion it was corrected on, stores one distilled synthesis, and
never stores secrets. This is the jam's seed example implemented directly, with
the discipline that makes long-term memory trustworthy.

**Demo video:** `<Walrus URL after upload>`

**Namespaces used:** `academic`, `industry`, `contrarian`, `raw-data`, `synthesis`, `corrections`
