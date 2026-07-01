// Cold-start check: shows the current state of one namespace.
// Usage: node src/recall.js [namespace] [query]
import { getClient, NAMESPACES } from "./client.js";

async function main() {
  const ns = process.argv[2] ?? NAMESPACES.ONCHAIN;
  const query = process.argv[3] ?? "everything";

  const client = getClient(ns);
  const res = await client.recall({ query, namespace: ns, limit: 10 });

  if (res.total === 0) {
    console.log(`Namespace "${ns}" is empty — fresh agent, nothing recalled.`);
    return;
  }

  console.log(`Recalled ${res.total} memories from "${ns}" (query: "${query}"):\n`);
  for (const m of res.results) {
    console.log(`  [dist ${m.distance.toFixed(3)}] ${m.text}`);
  }
}

main().catch((err) => {
  console.error("Recall failed:", err.message);
  process.exit(1);
});
