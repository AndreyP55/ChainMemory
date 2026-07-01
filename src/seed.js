// Writes the demo research memories to Walrus mainnet, one per namespace.
// Each write returns a real blob_id — collect them for evidence/blobs.md.
import { getClient, SEED } from "./client.js";

async function main() {
  console.log(`Seeding ${SEED.length} memories to Walrus mainnet...\n`);
  const rows = [];

  for (const { ns, text } of SEED) {
    const client = getClient(ns);
    const res = await client.rememberAndWait(text, ns, { timeoutMs: 60_000 });
    console.log(`  [${ns}] blob ${res.blob_id}`);
    console.log(`         ${text}\n`);
    rows.push({ ns, blob_id: res.blob_id, text });
  }

  console.log("Done. Markdown rows for evidence/blobs.md:\n");
  rows.forEach((r, i) =>
    console.log(`| ${i + 1} | ${r.ns} | ${r.text.slice(0, 50)}... | \`${r.blob_id}\` |`),
  );
}

main().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
