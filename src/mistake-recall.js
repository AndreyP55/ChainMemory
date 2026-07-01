// Shows the negative-knowledge behavior in isolation: given a draft conclusion,
// the agent checks the corrections namespace and refuses to repeat a past error.
// Usage: node src/mistake-recall.js "<draft conclusion>"
import { getClient, NAMESPACES } from "./client.js";

async function main() {
  const draft = process.argv[2] ?? "remote work is strictly better, recommend it company-wide";
  console.log(`\nDraft conclusion: "${draft}"`);

  const client = getClient(NAMESPACES.CORRECTIONS);
  const res = await client.recall({ query: draft, namespace: NAMESPACES.CORRECTIONS, limit: 5 });

  const relevant = res.results.filter((m) => m.distance < 0.7);
  if (relevant.length === 0) {
    console.log("No matching past correction — conclusion may proceed.\n");
    return;
  }

  console.log("\nHELD BACK — I was corrected on a similar conclusion before:");
  for (const m of relevant) console.log(`  ✗ ${m.text}`);
  console.log("\nApplying the lesson instead of repeating the error.\n");
}

main().catch((err) => {
  console.error("Correction recall failed:", err.message);
  process.exit(1);
});
