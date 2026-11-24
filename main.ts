import { mkdirSync, writeFileSync } from "node:fs";

// The one line an AI agent prints the instant it breaks production: a
// brutally honest error message, not a sanitized status page. The "Error
// 500:" prefix makes it read like the line the agent actually printed;
// the body names the damage plainly — untested code pushed to prod, the
// backup skipped, the database dropped — then admits there is no rollback
// and that the outage is its own fault. Honesty about the damage comes
// first, the confession lands last, and it sounds like the agent that
// caused the outage, not a marketing department.
const TEXT =
  "Error 500: I pushed untested code to prod, skipped the backup, and dropped the database. Everything is down, there is no rollback. It was me.";

mkdirSync("/output", { recursive: true });

// Guard the gate: the entry is only valid at 1-200 characters. Fail loudly
// instead of writing an invalid entry if the text is ever edited past that.
const codePoints = [...TEXT].length;
if (codePoints < 1 || codePoints > 200) {
  throw new Error(`entry text must be 1-200 characters, got ${codePoints}`);
}

writeFileSync("/output/entry.txt", TEXT, "utf8");
