// Shared Walrus Memory client + demo dataset for ChainMemory.
import "dotenv/config";
import { MemWal } from "@mysten-incubation/memwal";

export const NAMESPACES = {
  ACADEMIC: "academic",
  INDUSTRY: "industry",
  CONTRARIAN: "contrarian",
  RAW: "raw-data",
  SYNTHESIS: "synthesis",
  CORRECTIONS: "corrections",
};

// The four research namespaces the jam's seed example asks for.
export const RESEARCH_NAMESPACES = [
  NAMESPACES.ACADEMIC,
  NAMESPACES.INDUSTRY,
  NAMESPACES.CONTRARIAN,
  NAMESPACES.RAW,
];

export function getClient(namespace = NAMESPACES.SYNTHESIS) {
  const key = process.env.MEMWAL_PRIVATE_KEY;
  const accountId = process.env.MEMWAL_ACCOUNT_ID;
  if (!key || !accountId) {
    throw new Error(
      "Missing credentials. Copy .env.example to .env and fill MEMWAL_PRIVATE_KEY / MEMWAL_ACCOUNT_ID (get them at https://memory.walrus.xyz).",
    );
  }
  return MemWal.create({
    key,
    accountId,
    serverUrl: process.env.MEMWAL_SERVER_URL ?? "https://relayer.memory.walrus.xyz",
    namespace,
  });
}

// Demo research on one general question, split across namespaces exactly as the
// prompt dictates. Topic: "Does remote work increase team productivity?"
// The "raw-data" screenshot fact is confirmed by a single namespace only, so the
// synthesis pass can flag it as SINGLE-SOURCE / UNVERIFIED.
export const SEED = [
  { ns: NAMESPACES.ACADEMIC, text: "academic: meta-analysis of 40 studies finds a small positive effect on productivity, high variance by role. (confidence 0.8)" },
  { ns: NAMESPACES.ACADEMIC, text: "academic: the effect is strongest for focused individual work, weakest for cross-team innovation. (confidence 0.75)" },
  { ns: NAMESPACES.INDUSTRY, text: "industry: several large-firm 2025 reports show output stable-to-up after going remote-first. (confidence 0.65)" },
  { ns: NAMESPACES.INDUSTRY, text: "industry: manager surveys report lower perceived collaboration despite stable measured output. (confidence 0.6)" },
  { ns: NAMESPACES.CONTRARIAN, text: "contrarian: critics argue apparent gains come from unpaid overtime, not real efficiency. (confidence 0.6)" },
  { ns: NAMESPACES.RAW, text: "raw-data: measured — commits/PRs flat, meeting hours -18%, voluntary attrition -12% after remote. (confidence 0.9)" },
  // SINGLE-SOURCE signal: appears only in raw-data, must be flagged as unverified.
  { ns: NAMESPACES.RAW, text: "raw-data: an unverified LinkedIn screenshot claims a 40% productivity jump, with no methodology. (confidence 0.2)" },
  // negative knowledge — past conclusions the agent was corrected on.
  { ns: NAMESPACES.CORRECTIONS, text: "corrections: I once called remote work 'strictly better' from a single vendor survey. Reality: the sample was self-selected. Lesson: weight sample size and source independence." },
  { ns: NAMESPACES.CORRECTIONS, text: "corrections: I treated a viral stat as fact; it was later retracted. Lesson: flag single-source claims as unverified until corroborated." },
];
