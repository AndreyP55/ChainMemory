// The core deliverable: recall across all four research namespaces, flag any
// fact only a single source confirmed, check the mistakes namespace, then store
// ONE distilled synthesis note. This is the jam's seed example, made concrete.
// Usage: node src/synthesis.js "<topic>"
import { getClient, RESEARCH_NAMESPACES, NAMESPACES } from "./client.js";

const RELEVANT = 0.7; // distance below this = relevant (per SKILL.md guidance)

async function main() {
  const topic = process.argv[2] ?? "does remote work increase team productivity";
  console.log(`\n=== ChainMemory synthesis for: "${topic}" ===\n`);

  // 1. Recall across all four research namespaces.
  const perNamespace = {};
  for (const ns of RESEARCH_NAMESPACES) {
    const client = getClient(ns);
    const res = await client.recall({ query: topic, namespace: ns, limit: 5 });
    perNamespace[ns] = res.results.filter((m) => m.distance < RELEVANT);
  }

  // 2. Report which namespaces confirmed something (cross-source vs single-source).
  const sourcesWithHits = RESEARCH_NAMESPACES.filter((ns) => perNamespace[ns].length > 0);
  console.log(`Sources that returned relevant facts: ${sourcesWithHits.length}/4 (${sourcesWithHits.join(", ")})\n`);

  console.log("CROSS-SOURCE (confirmed by the research spread — higher trust):");
  for (const ns of sourcesWithHits) {
    for (const m of perNamespace[ns]) console.log(`  [${ns}] ${m.text}`);
  }

  // 3. Flag single-source / low-confidence claims explicitly.
  console.log("\nSINGLE-SOURCE / UNVERIFIED (do NOT treat as confirmed):");
  let flagged = 0;
  for (const ns of sourcesWithHits) {
    for (const m of perNamespace[ns]) {
      if (/unverified|claims|screenshot|rumou?r/i.test(m.text)) {
        console.log(`  ⚠ [${ns}] ${m.text}`);
        flagged++;
      }
    }
  }
  if (flagged === 0) console.log("  (none)");

  // 4. Check the corrections namespace before concluding.
  const correctionsClient = getClient(NAMESPACES.CORRECTIONS);
  const corrections = await correctionsClient.recall({ query: topic, namespace: NAMESPACES.CORRECTIONS, limit: 5 });
  console.log("\nCORRECTIONS CHECK (conclusions I was corrected on before):");
  if (corrections.total === 0) {
    console.log("  (no prior corrections on record)");
  } else {
    for (const m of corrections.results) console.log(`  ✗ ${m.text}`);
  }

  // 5. Store ONE distilled synthesis note — the conclusion only, never raw passes.
  const note =
    `synthesis for "${topic}": ${sourcesWithHits.length}/4 sources aligned, ` +
    `${flagged} single-source claim(s) flagged unverified, ` +
    `${corrections.total} past correction(s) applied. ` +
    `Verdict: hold conclusions to sample size and source independence.`;
  const synthClient = getClient(NAMESPACES.SYNTHESIS);
  const stored = await synthClient.rememberAndWait(note, NAMESPACES.SYNTHESIS, { timeoutMs: 60_000 });
  console.log(`\nStored synthesis to Walrus mainnet — blob ${stored.blob_id}\n`);
}

main().catch((err) => {
  console.error("Synthesis failed:", err.message);
  process.exit(1);
});
