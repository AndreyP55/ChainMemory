// Session start: before researching anything, load synthesis + mistakes so the
// agent continues instead of starting from zero. This is the "never start from
// zero" half of ChainMemory.
import { getClient, NAMESPACES } from "./client.js";

async function briefing(ns, query, label) {
  const client = getClient(ns);
  const res = await client.recall({ query, namespace: ns, limit: 5 });
  console.log(`\n${label}:`);
  if (res.total === 0) {
    console.log("  (nothing remembered yet)");
    return;
  }
  for (const m of res.results) console.log(`  • ${m.text}`);
}

async function main() {
  console.log("=== ChainMemory session start — loading memory from Walrus mainnet ===");
  await briefing(NAMESPACES.SYNTHESIS, "prior conclusions", "WHAT I ALREADY CONCLUDED");
  await briefing(NAMESPACES.MISTAKES, "patterns to avoid", "WHAT BURNED ME BEFORE");
  console.log("\nReady. Research continues from here, not from zero.\n");
}

main().catch((err) => {
  console.error("Session load failed:", err.message);
  process.exit(1);
});
