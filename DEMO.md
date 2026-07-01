# Demo script (≤ 3 minutes)

Shot-by-shot plan for the submission video. Record the terminal + browser.
Goal: prove ChainMemory writes to Walrus mainnet and changes behavior across sessions.

## 0:00–0:20 — The problem
- One line on camera / voiceover: "Every session, my research agent forgets what
  it learned and repeats calls that already rugged me. ChainMemory fixes both."

## 0:20–0:45 — Connect (Agent ID)
- Show `memwal_login` (MCP) or the dashboard at memory.walrus.xyz.
- Connect Sui wallet in the browser. Show the resulting **account ID** — this is
  the Agent ID in the submission.

## 0:45–1:20 — Seed real memory to mainnet
- Run `npm run seed`.
- Point at the printed **blob IDs** — "these are real, encrypted blobs on Walrus
  mainnet, one per namespace." Copy them into `evidence/blobs.md` live.

## 1:20–2:00 — The core deliverable (the brief)
- Run `npm run synthesis "is this token safe"`.
- Narrate the on-screen output:
  - "Recalls across all four research namespaces" ← the brief
  - "Flags the CEX-listing rumor as SINGLE-SOURCE / UNVERIFIED" ← the brief
  - "Checks mistakes, applies the PORK/BABYuPEG lesson"
  - "Stores ONE synthesis note" ← the brief

## 2:00–2:35 — Behavior change across sessions
- Run `npm run mistake-recall "token looks clean, safe to call"`.
- Show the agent HOLD BACK, citing the real past rug pattern.
- Then `npm run session` — "new session, it loads what it concluded and what
  burned it. Never starts from zero."

## 2:35–3:00 — Close
- Show the GitHub repo + the `evidence/blobs.md` table with real blob IDs.
- "Verifiable on mainnet. The prompt is one copy-paste. This is exactly the seed
  example the jam asked for — built for the domain where it pays off."

## Checklist before recording
- [ ] `.env` filled, `npm run seed` already succeeded once (warm cache)
- [ ] blob IDs pasted into `evidence/blobs.md`
- [ ] Agent ID pasted into `SUBMISSION.md`
- [ ] terminal font large enough to read
- [ ] upload final video to Walrus, paste URL into `SUBMISSION.md`
