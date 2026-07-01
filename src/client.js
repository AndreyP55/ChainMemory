// Shared Walrus Memory client + demo dataset for ChainMemory.
import "dotenv/config";
import { MemWal } from "@mysten-incubation/memwal";

export const NAMESPACES = {
  ONCHAIN: "onchain",
  SOCIAL: "social",
  NARRATIVE: "narrative",
  RAW: "raw-data",
  SYNTHESIS: "synthesis",
  MISTAKES: "mistakes",
};

// The four research namespaces the jam's seed example asks for.
export const RESEARCH_NAMESPACES = [
  NAMESPACES.ONCHAIN,
  NAMESPACES.SOCIAL,
  NAMESPACES.NARRATIVE,
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

// Demo research on one token, split across namespaces exactly as the prompt dictates.
// Note: "onlyOne" facts are deliberately confirmed by a single namespace so the
// synthesis pass can flag them as SINGLE-SOURCE / UNVERIFIED.
export const SEED = [
  { ns: NAMESPACES.ONCHAIN, text: "onchain: deployer wallet funded LP with 4.2 ETH, LP locked 90 days via UNCX. (confidence 0.9)" },
  { ns: NAMESPACES.ONCHAIN, text: "onchain: top-10 holders control 38% of supply, no single wallet > 6%. (confidence 0.85)" },
  { ns: NAMESPACES.SOCIAL, text: "social: 3 mid-tier CT accounts (15-40k) posted organically, no paid-shill language. (confidence 0.6)" },
  { ns: NAMESPACES.SOCIAL, text: "social: founder doxxed on a Twitter Space, matches a prior shipped project. (confidence 0.7)" },
  { ns: NAMESPACES.NARRATIVE, text: "narrative: fits the 'onchain AI agent' sector rotation, comparable to peers up 3-5x. (confidence 0.65)" },
  { ns: NAMESPACES.RAW, text: "raw-data: mcap $1.8M, 24h vol $420k, 7,100 holders, price +26% since launch. (confidence 0.95)" },
  // SINGLE-SOURCE signal: appears only in raw-data, must be flagged as unverified.
  { ns: NAMESPACES.RAW, text: "raw-data: an unverified screenshot claims a tier-1 CEX listing next week. (confidence 0.25)" },
  // negative knowledge from real past incidents (authentic, not invented).
  { ns: NAMESPACES.MISTAKES, text: "mistakes: PORK looked clean but owner had a blacklist function + LP rug on minute 4. Pattern: always simulate a sell from a fresh wallet before calling safe." },
  { ns: NAMESPACES.MISTAKES, text: "mistakes: BABYuPEG had a transferFrom backdoor; deployer moved tokens with no approve. Pattern: check for non-standard transferFrom, honeypot checkers miss it." },
];
