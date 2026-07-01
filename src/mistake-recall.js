// Shows the negative-knowledge behavior in isolation: given a draft conclusion,
// the agent checks the mistakes namespace and refuses to repeat a burned pattern.
// Usage: node src/mistake-recall.js "<draft conclusion>"
import { getClient, NAMESPACES } from "./client.js";

async function main() {
  const draft = process.argv[2] ?? "token looks clean, safe to call";
  console.log(`\nDraft conclusion: "${draft}"`);

  const client = getClient(NAMESPACES.MISTAKES);
  const res = await client.recall({ query: draft, namespace: NAMESPACES.MISTAKES, limit: 5 });

  const relevant = res.results.filter((m) => m.distance < 0.7);
  if (relevant.length === 0) {
    console.log("No matching past mistake — conclusion may proceed.\n");
    return;
  }

  console.log("\nHELD BACK — I got a similar call wrong before:");
  for (const m of relevant) console.log(`  ✗ ${m.text}`);
  console.log("\nApplying the lesson instead of repeating the mistake.\n");
}

main().catch((err) => {
  console.error("Mistake recall failed:", err.message);
  process.exit(1);
});
