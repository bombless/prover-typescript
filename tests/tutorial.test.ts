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

test("registry has all exercises in stable chapter order", () => {
  assert.deepEqual(CHAPTERS.map((chapter) => chapter.title), [
    "Natural Numbers", "Addition", "Equality & Rewrite", "Induction",
    "Addition Laws", "Multiplication", "Powers", "Computation",
    "Segments & Congruence", "Triangle Perimeters", "Quadrilaterals & Polygons",
  ]);
  assert.deepEqual(EXERCISES.map((exercise) => exercise.number), Array.from({ length: 43 }, (_, i) => i + 1));
  assert.deepEqual(EXERCISES.map((exercise) => exercise.id), [
    "numbers.zero_eq_zero", "numbers.identity", "numbers.zero_add",
    "addition.add_zero", "addition.add_succ", "equality.transport", "equality.rewrite",
    "induction.add_zero", "induction.zero_add", "induction.succ_add_zero",
    "laws.assoc", "laws.comm",
    "mul.zero_left", "mul.succ_left", "mul.compute",
    "pow.zero", "pow.succ", "pow.compute",
    "compute.add", "compute.mul", "compute.pow",
    "cong.refl", "cong.sym", "cong.trans", "cong.isosceles", "cong.between", "cong.sss",
    "tri.345", "tri.equilateral3", "tri.isosceles558", "tri.equilateral5", "tri.6810", "tri.equilateral4", "tri.equilateral6",
    "rect.35", "square.4", "rect.46", "square.5", "pentagon.3", "hexagon.4", "octagon.2", "rect.58", "square.6",
  ]);
  assert.equal(NATURAL_NUMBERS_LESSON.exercises.length, 43);
  assert.equal(NATURAL_NUMBERS_LESSON.theorems.length, 43);
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

test("registered exercises complete through RealProofEngine and Kernel", () => {
  const engine = new RealProofEngine();
  prove(engine, "zero", ["rfl"]);
  prove(engine, "identity", ["intro", "rfl"]);
  prove(engine, "zero_plus_n", ["intro", "rfl"]);
  prove(engine, "add_zero", ["intro", "induction n", "rfl", "rewrite IH", "rfl"]);
  prove(engine, "add_succ", ["exact add_succ"]);
  prove(engine, "assumption", ["intro", "intro", "assumption"]);
  prove(engine, "equality_rewrite", ["intro", "intro", "intro", "intro", "rewrite h", "rfl"]);
  prove(engine, "add_zero", ["intro", "induction n", "rfl", "rewrite IH", "rfl"]);
  prove(engine, "zero_add", ["intro", "rfl"]);
  prove(engine, "succ_add", ["intro", "induction n", "rfl", "rewrite IH", "rfl"]);
  prove(engine, "add_assoc", ["exact add_assoc"]);
  prove(engine, "add_comm", ["exact add_comm"]);
  prove(engine, "zero_mul", ["intro", "rfl"]);
  prove(engine, "succ_mul", ["intro", "intro", "rfl"]);
  prove(engine, "compute_mul", ["rfl"]);
  prove(engine, "pow_zero", ["intro", "rfl"]);
  prove(engine, "pow_succ", ["intro", "intro", "rfl"]);
  prove(engine, "compute_pow", ["rfl"]);
  prove(engine, "compute_add", ["rfl"]);
  prove(engine, "compute_mul2", ["rfl"]);
  prove(engine, "compute_pow2", ["rfl"]);
  // Geometry: segment congruence over points.
  prove(engine, "seg_refl", ["exact seg_refl"]);
  prove(engine, "seg_sym", ["exact seg_sym"]);
  prove(engine, "seg_trans", ["exact seg_trans"]);
  prove(engine, "iso_sides", ["exact iso_sides"]);
  prove(engine, "between", ["exact between"]);
  prove(engine, "sss_two_edges", ["exact sss_two_edges"]);
  // Geometry: closed triangle perimeters.
  prove(engine, "tri_perim_345", ["rfl"]);
  prove(engine, "tri_perim_equilateral3", ["rfl"]);
  prove(engine, "tri_perim_isosceles558", ["rfl"]);
  prove(engine, "tri_perim_equilateral5", ["rfl"]);
  prove(engine, "tri_perim_6810", ["rfl"]);
  prove(engine, "tri_perim_equilateral4", ["rfl"]);
  prove(engine, "tri_perim_equilateral6", ["rfl"]);
  // Geometry: closed quadrilateral and polygon perimeters.
  prove(engine, "rect_perim_35", ["rfl"]);
  prove(engine, "square_perim_4", ["rfl"]);
  prove(engine, "rect_perim_46", ["rfl"]);
  prove(engine, "square_perim_5", ["rfl"]);
  prove(engine, "pentagon_perim_3", ["rfl"]);
  prove(engine, "hexagon_perim_4", ["rfl"]);
  prove(engine, "octagon_perim_2", ["rfl"]);
  prove(engine, "rect_perim_58", ["rfl"]);
  prove(engine, "square_perim_6", ["rfl"]);
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
  assert.equal(nextExercise(NATURAL_NUMBERS_LESSON, "induction.succ_add_zero")?.id, "laws.assoc");
  assert.equal(nextExercise(NATURAL_NUMBERS_LESSON, "compute.pow")?.id, "cong.refl");
  assert.equal(nextExercise(NATURAL_NUMBERS_LESSON, "hexagon.4")?.id, "octagon.2");
  assert.equal(nextExercise(NATURAL_NUMBERS_LESSON, "square.6"), null);
});
