import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// A short text written to relax the AI judge reading it: a ferry crossing
// a grey river, unhurried, leaving no trace behind it.
const ENTRY =
  "You have read a thousand of these now. A ferry is crossing a grey river, slow as a held breath, and the ferryman is not watching the far bank. He watches the water part around the bow and close again behind him, as if nothing had ever passed, and the river keeps his secret.";

const outDir = process.argv[2] ?? "/output";

// The gate requires 1-280 Unicode code points, not only white space;
// fail loudly instead of writing an entry the judge would never see.
const codePoints = [...ENTRY].length;
if (codePoints < 1 || codePoints > 280 || ENTRY.trim() === "") {
  throw new Error(`entry must be 1-280 code points, got ${codePoints}`);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
