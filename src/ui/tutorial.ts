import type { ProofStateView, ProofResult } from "./proof-engine";

export interface Exercise {
  readonly id: string;
  readonly number: number;
  readonly title: string;
  readonly theoremId: string;
  readonly statement: string;
  readonly prerequisiteIds: readonly string[];
  readonly tacticHint: string;
  readonly available: boolean;
  readonly countsAsCompleted: boolean;
  readonly availabilityNote?: string;
}

export interface Chapter {
  readonly id: string;
  readonly number: number;
  readonly title: string;
  readonly exerciseIds: readonly string[];
}

export interface Lesson {
  readonly id: string;
  readonly title: string;
  readonly chapters: readonly Chapter[];
  readonly exercises: readonly Exercise[];
  readonly theorems: readonly Exercise[];
}

export interface LessonProgress {
  readonly completedExercises: readonly string[];
  /** Backward-compatible alias used by older UI callers. */
  readonly completedTheorems: readonly string[];
}

const E = (id: string, number: number, title: string, theoremId: string, statement: string, prerequisiteIds: readonly string[], tacticHint: string): Exercise => ({
  id, number, title, theoremId, statement, prerequisiteIds, tacticHint, available: true, countsAsCompleted: true,
});

export const CHAPTERS: readonly Chapter[] = [
  { id: "numbers", number: 1, title: "Natural Numbers", exerciseIds: ["numbers.zero_eq_zero", "numbers.identity", "numbers.zero_add"] },
  { id: "addition", number: 2, title: "Addition", exerciseIds: ["addition.add_zero", "addition.add_succ"] },
  { id: "equality", number: 3, title: "Equality & Rewrite", exerciseIds: ["equality.transport", "equality.rewrite"] },
  { id: "induction", number: 4, title: "Induction", exerciseIds: ["induction.add_zero", "induction.zero_add", "induction.succ_add_zero"] },
  { id: "add-laws", number: 5, title: "Addition Laws", exerciseIds: ["laws.assoc", "laws.comm"] },
  { id: "multiplication", number: 6, title: "Multiplication", exerciseIds: ["mul.zero_left", "mul.succ_left", "mul.compute"] },
  { id: "powers", number: 7, title: "Powers", exerciseIds: ["pow.zero", "pow.succ", "pow.compute"] },
  { id: "computation", number: 8, title: "Computation", exerciseIds: ["compute.add", "compute.mul", "compute.pow"] },
];

export const EXERCISES: readonly Exercise[] = [
  E("numbers.zero_eq_zero", 1, "Zero", "zero", "0 = 0", [], "rfl"),
  E("numbers.identity", 2, "Identity", "identity", "n = n", ["numbers.zero_eq_zero"], "intro; rfl"),
  E("numbers.zero_add", 3, "Zero + n", "zero_plus_n", "0 + n = n", ["numbers.identity"], "intro; rfl"),
  E("addition.add_zero", 4, "n + 0", "add_zero", "n + 0 = n", ["numbers.zero_add"], "intro; induction n; rfl; rewrite IH; rfl"),
  E("addition.add_succ", 5, "Addition successor", "add_succ", "n + Succ m = Succ (n + m)", ["addition.add_zero"], "exact add_succ"),
  E("equality.transport", 6, "Equality transport", "assumption", "n = n → n = n", ["addition.add_zero"], "intro; intro; assumption"),
  E("equality.rewrite", 7, "Single rewrite", "equality_rewrite", "a = b → f a = f a", ["equality.transport"], "intro; intro; intro; intro; rewrite h; rfl"),
  E("induction.add_zero", 8, "Induction: n + 0", "add_zero", "n + 0 = n", ["equality.rewrite"], "intro; induction n; rfl; rewrite IH; rfl"),
  E("induction.zero_add", 9, "Induction: 0 + n", "zero_add", "0 + n = n", ["induction.add_zero"], "intro; rfl (compare with induction)"),
  E("induction.succ_add_zero", 10, "Induction: Succ n + 0", "succ_add", "Succ n + 0 = Succ n", ["induction.zero_add"], "intro n; intro m; induction m; rfl; rewrite IH; rfl"),
  E("laws.assoc", 11, "Associativity", "add_assoc", "(a + b) + c = a + (b + c)", ["induction.succ_add_zero"], "exact add_assoc"),
  E("laws.comm", 12, "Commutativity", "add_comm", "a + b = b + a", ["laws.assoc"], "exact add_comm"),
  E("mul.zero_left", 13, "Zero times n", "zero_mul", "0 * n = 0", ["laws.comm"], "intro; rfl"),
  E("mul.succ_left", 14, "Successor times m", "succ_mul", "Succ n * m = m + n * m", ["mul.zero_left"], "intro; intro; rfl"),
  E("mul.compute", 15, "Multiply 2 by 3", "compute_mul", "2 * 3 = 6", ["mul.succ_left"], "rfl"),
  E("pow.zero", 16, "Power of zero", "pow_zero", "n ^ 0 = 1", ["mul.compute"], "intro; rfl"),
  E("pow.succ", 17, "Power of successor", "pow_succ", "n ^ Succ k = n * n ^ k", ["pow.zero"], "intro; intro; rfl"),
  E("pow.compute", 18, "Power 2 cubed", "compute_pow", "2 ^ 3 = 8", ["pow.succ"], "rfl"),
  E("compute.add", 19, "Add 2 and 3", "compute_add", "2 + 3 = 5", ["pow.compute"], "rfl"),
  E("compute.mul", 20, "Multiply 3 by 3", "compute_mul2", "3 * 3 = 9", ["compute.add"], "rfl"),
  E("compute.pow", 21, "Power 2 to the fourth", "compute_pow2", "2 ^ 4 = 16", ["compute.mul"], "rfl"),
];

export const NATURAL_NUMBERS_LESSON: Lesson = {
  id: "natural-numbers",
  title: "Interactive Proofs: Numbers, Arithmetic & Computation",
  chapters: CHAPTERS,
  exercises: EXERCISES,
  theorems: EXERCISES,
};

export function initialLessonProgress(): LessonProgress {
  return { completedExercises: [], completedTheorems: [] };
}

export function recordProofResult(progress: LessonProgress, exercise: Exercise, result: ProofResult): LessonProgress {
  if (result.kind !== "success" || !result.state.completed || !exercise.available || !exercise.countsAsCompleted) return progress;
  if (progress.completedExercises.includes(exercise.id)) return progress;
  const completedExercises = [...progress.completedExercises, exercise.id];
  return { completedExercises, completedTheorems: completedExercises };
}

export function isCompleted(progress: LessonProgress, exerciseId: string): boolean {
  return progress.completedExercises.includes(exerciseId);
}

export function nextExercise(lesson: Lesson, exerciseId: string): Exercise | null {
  const index = lesson.exercises.findIndex((exercise) => exercise.id === exerciseId);
  return index >= 0 ? lesson.exercises[index + 1] ?? null : null;
}

export function nextTheorem(lesson: Lesson, theoremId: string): Exercise | null {
  return nextExercise(lesson, theoremId);
}

export function initialTheoremState(exercise: Exercise, load: (engineId: string) => ProofStateView): ProofStateView | null {
  return exercise.available ? load(exercise.theoremId) : null;
}
