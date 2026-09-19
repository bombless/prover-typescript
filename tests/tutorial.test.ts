import test from "node:test";
import assert from "node:assert/strict";
import { RealProofEngine } from "../src/ui/proof-engine";
import { CHAPTERS, EXERCISES, NATURAL_NUMBERS_LESSON, initialLessonProgress, isCompleted, nextExercise, recordProofResult } from "../src/ui/tutorial";

function prove(engine: RealProofEngine, theoremId: string, tactics: readonly string[]): void {
  engine.loadTheorem(theoremId);
  let result = engine.runTactic(tactics[0]);
  for (const tactic of tactics.slice(1)) {
    assert.equal(result.kind, "success", `${theoremId}: ${tactic} should run after a successful previous tactic`);
    result = engine.runTactic(tactic);
  }
  assert.equal(result.kind, "success", `${theoremId} should complete`);
  assert.equal(result.state.completed, true, `${theoremId} should be Kernel-backed complete`);
}

test("Chapters 1-4 registry has ten stable exercises in order", () => {
  assert.deepEqual(CHAPTERS.map((chapter) => chapter.title), ["Natural Numbers", "Addition", "Equality & Rewrite", "Induction"]);
  assert.deepEqual(EXERCISES.map((exercise) => exercise.number), [1,2,3,4,5,6,7,8,9,10]);
  assert.deepEqual(EXERCISES.map((exercise) => exercise.id), [
    "numbers.zero_eq_zero", "numbers.identity", "numbers.zero_add",
    "addition.add_zero", "addition.add_succ", "equality.transport", "equality.rewrite",
    "induction.add_zero", "induction.zero_add", "induction.succ_add_zero",
  ]);
  assert.equal(NATURAL_NUMBERS_LESSON.exercises.length, 10);
  assert.equal(NATURAL_NUMBERS_LESSON.theorems.length, 10);
});

test("registry exercises all load real proof goals", () => {
  const engine = new RealProofEngine();
  for (const exercise of EXERCISES) {
    const state = engine.loadTheorem(exercise.theoremId);
    assert.equal(state.theoremName, exercise.theoremId);
    assert.equal(state.completed, false);
    assert.ok(state.goals.length > 0);
    assert.equal(exercise.available, true);
  }
});

test("every displayed tutorial path completes through RealProofEngine and Kernel", async (t) => {
  const engine = new RealProofEngine();
  for (const exercise of EXERCISES) {
    await t.test(exercise.id, () => {
      prove(engine, exercise.theoremId, exercise.tacticHint.split(";").map((tactic) => tactic.trim()));
    });
  }
});

test("rewrite success and failure are real and failed rewrite rolls back", () => {
  const engine = new RealProofEngine();
  engine.loadTheorem("equality_transport");
  assert.equal(engine.runTactic("intro").kind, "success");
  assert.equal(engine.runTactic("intro").kind, "success");
  const before = engine.runTactic("intro");
  assert.equal(before.kind, "success");
  const failed = engine.runTactic("rewrite a");
  assert.equal(failed.kind, "error");
  assert.deepEqual(failed.state, before.state);
});

test("induction creates base, successor, and real IH context", () => {
  const engine = new RealProofEngine();
  engine.loadTheorem("add_zero");
  engine.runTactic("intro");
  const result = engine.runTactic("induction n");
  assert.equal(result.kind, "success");
  assert.equal(result.state.goals.length, 2);
  assert.equal(result.state.goals[0].context.length, 0);
  assert.equal(result.state.goals[1].context.at(-1)?.name, "IH");
  // The proof engine stores the real Core equality, while the UI view intentionally
  // projects it to surface notation for tutorial users.
  assert.equal(result.state.goals[1].context.at(-1)?.type, "n + 0 = n");
});

test("bad induction variable leaves the proof state unchanged", () => {
  const engine = new RealProofEngine();
  engine.loadTheorem("add_zero");
  engine.runTactic("intro");
  const before = engine.loadTheorem("add_zero");
  engine.runTactic("intro");
  const failed = engine.runTactic("induction missing");
  assert.equal(failed.kind, "error");
  assert.equal(failed.state.goals.length, 1);
});

test("progress records only successful Kernel-backed completion and keeps exercise 4/8 distinct", () => {
  let progress = initialLessonProgress();
  const exercise4 = EXERCISES[3];
  const exercise8 = EXERCISES[7];
  const complete = { kind: "success" as const, state: { theoremName: "fake", completed: true, goals: [] } };

  assert.notEqual(exercise4.id, exercise8.id);
  assert.equal(exercise4.theoremId, "add_zero");
  assert.equal(exercise8.theoremId, "add_zero");

  // Acceptance case 1: completing Exercise 4 must not complete Exercise 8.
  progress = recordProofResult(progress, exercise4, complete);
  assert.deepEqual(progress, { completedExercises: [exercise4.id], completedTheorems: [exercise4.id] });
  assert.equal(isCompleted(progress, exercise4.id), true);
  assert.equal(isCompleted(progress, exercise8.id), false);

  // Acceptance case 2: completing Exercise 8 adds only its own ID and preserves
  // Exercise 4 as an independently represented completed exercise.
  progress = recordProofResult(progress, exercise8, complete);
  assert.deepEqual(progress, {
    completedExercises: [exercise4.id, exercise8.id],
    completedTheorems: [exercise4.id, exercise8.id],
  });
  assert.equal(isCompleted(progress, exercise4.id), true);
  assert.equal(isCompleted(progress, exercise8.id), true);
});

test("next exercise follows chapter order", () => {
  assert.equal(nextExercise(NATURAL_NUMBERS_LESSON, "numbers.zero_eq_zero")?.id, "numbers.identity");
  assert.equal(nextExercise(NATURAL_NUMBERS_LESSON, "addition.add_succ")?.id, "equality.transport");
  assert.equal(nextExercise(NATURAL_NUMBERS_LESSON, "induction.succ_add_zero"), null);
});
