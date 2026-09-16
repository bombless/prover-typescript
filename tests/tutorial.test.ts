import test from "node:test";
import assert from "node:assert/strict";
import { RealProofEngine } from "../src/ui/proof-engine";
import {
  NATURAL_NUMBERS_LESSON,
  initialLessonProgress,
  isCompleted,
  nextTheorem,
  recordProofResult,
} from "../src/ui/tutorial";

test("UI-4 Natural Numbers lesson loads in the planned order", () => {
  assert.equal(NATURAL_NUMBERS_LESSON.title, "Natural Numbers");
  assert.deepEqual(NATURAL_NUMBERS_LESSON.theorems.map((theorem) => theorem.title), [
    "01 Zero",
    "02 Equality",
    "03 Addition",
    "04 Addition: Successor",
  ]);
});

test("UI-4 theorem selection maps supported tutorial items to real engine theorem IDs", () => {
  assert.equal(NATURAL_NUMBERS_LESSON.theorems[0].engineTheoremId, "zero");
  assert.equal(NATURAL_NUMBERS_LESSON.theorems[1].engineTheoremId, "identity");
});

test("UI-4 addition tutorial content records partial current engine capability", () => {
  const addition = NATURAL_NUMBERS_LESSON.theorems[2];
  const successor = NATURAL_NUMBERS_LESSON.theorems[3];
  assert.equal(addition.available, true);
  assert.equal(addition.countsAsCompleted, false);
  assert.equal(addition.engineTheoremId, "zero_plus_n");
  assert.match(addition.availabilityNote ?? "", /n \+ 0 = n/);
  assert.equal(successor.available, false);
  assert.equal(successor.engineTheoremId, null);
});

test("UI-4 real engine capability audit: zero and n = n are kernel-backed", () => {
  const engine = new RealProofEngine();

  engine.loadTheorem("zero");
  const zeroResult = engine.runTactic("rfl");
  assert.equal(zeroResult.kind, "success");
  assert.equal(zeroResult.state.completed, true);

  engine.loadTheorem("identity");
  assert.equal(engine.runTactic("intro").kind, "success");
  const identityResult = engine.runTactic("rfl");
  assert.equal(identityResult.kind, "success");
  assert.equal(identityResult.state.completed, true);

  engine.loadTheorem("zero_plus_n");
  assert.equal(engine.runTactic("intro").kind, "success");
  const zeroPlusNResult = engine.runTactic("rfl");
  assert.equal(zeroPlusNResult.kind, "success");
  assert.equal(zeroPlusNResult.state.completed, true);
});

test("UI-4 real engine capability audit: addition tutorial theorems are not registered", () => {
  const engine = new RealProofEngine();
  const fallback = engine.loadTheorem("n_plus_zero");
  assert.equal(fallback.theoremName, "zero");
  assert.equal(fallback.completed, false);
  assert.equal(fallback.goals[0].target, "Eq Nat 0 0");
});

test("UI-4 progress only records kernel-backed completed results", () => {
  const progress = initialLessonProgress();
  const zero = NATURAL_NUMBERS_LESSON.theorems[0];
  const engine = new RealProofEngine();
  engine.loadTheorem("zero");
  const result = engine.runTactic("rfl");
  const completed = recordProofResult(progress, zero, result);
  assert.equal(isCompleted(completed, "zero"), true);

  const addition = NATURAL_NUMBERS_LESSON.theorems[2];
  const fakeSuccess = { kind: "success" as const, state: { theoremName: "fake", completed: true, goals: [] } };
  assert.deepEqual(recordProofResult(completed, addition, fakeSuccess), completed);
});

test("UI-4 next theorem follows lesson order", () => {
  assert.equal(nextTheorem(NATURAL_NUMBERS_LESSON, "zero")?.id, "equality");
  assert.equal(nextTheorem(NATURAL_NUMBERS_LESSON, "equality")?.id, "addition");
  assert.equal(nextTheorem(NATURAL_NUMBERS_LESSON, "addition-successor"), null);
});

test("UI-4 real engine theorem selection resets to a fresh proof state", () => {
  const engine = new RealProofEngine();
  engine.loadTheorem("identity");
  assert.equal(engine.runTactic("intro").kind, "success");
  engine.loadTheorem("zero");
  const zero = engine.loadTheorem("zero");
  assert.equal(zero.completed, false);
  assert.equal(zero.goals[0].target, "Eq Nat 0 0");
  engine.loadTheorem("identity");
  const identity = engine.loadTheorem("identity");
  assert.equal(identity.completed, false);
  assert.equal(identity.goals[0].target, "(x : Nat) -> Eq Nat n n");
});
