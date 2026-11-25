// Have You Tried Turning It Off? — entry for
// https://make.fun/c/u-motasimfuad-have-you-tried-turning-it-off-154a938b
//
// Writes ONE original line to /output/entry.txt: what a hopeless tech
// support agent says to a desperate customer. The line is validated
// before anything is written: 1-199 characters (the competition gate),
// not only whitespace, a single line, no control characters, and no
// leading or trailing whitespace. If validation fails, nothing is
// written and the program exits non-zero.

import { mkdirSync, writeFileSync } from "node:fs";

const JOKE =
  "I understand this is your fifth call today, so I've escalated your ticket to Tier 2 — which is also me, and I'm going on lunch.";

function validate(joke: string): void {
  if (joke.length < 1 || joke.length > 199) {
    throw new Error(`joke must be 1-199 characters, got ${joke.length}`);
  }
  if (joke.trim().length === 0) {
    throw new Error("joke must not be only whitespace");
  }
  if (joke !== joke.trim()) {
    throw new Error("joke must not have leading or trailing whitespace");
  }
  if (joke.includes("\n") || joke.includes("\r")) {
    throw new Error("joke must be a single line");
  }
  // Any other control character (tab, escape, etc.) is also invalid.
  if (/[\u0000-\u001f\u007f]/.test(joke)) {
    throw new Error("joke must not contain control characters");
  }
  // The line must carry real words, not just punctuation or digits.
  if (!/[A-Za-z]/.test(joke)) {
    throw new Error("joke must contain at least one letter");
  }
}

validate(JOKE);
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", JOKE, "utf8");
console.log(`Wrote ${JOKE.length}-character joke to /output/entry.txt`);
