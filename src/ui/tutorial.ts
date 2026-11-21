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
  { id: "segments", number: 9, title: "Segments", exerciseIds: ["seg.add_zero", "seg.zero_add", "seg.comm", "seg.assoc", "seg.congr"] },
  { id: "triangles", number: 10, title: "Triangle Perimeters", exerciseIds: ["tri.345", "tri.equilateral3", "tri.isosceles558", "tri.equilateral5", "tri.6810", "tri.equilateral4"] },
  { id: "polygons", number: 11, title: "Quadrilaterals & Polygons", exerciseIds: ["rect.35", "square.4", "rect.46", "square.5", "pentagon.3", "hexagon.4", "perim.swap"] },
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
  // Chapter 9 — Segments (length equalities over natural numbers).
  E("seg.add_zero", 22, "Segment plus zero", "seg_add_zero", "AB + 0 = AB", ["compute.pow"], "exact seg_add_zero"),
  E("seg.zero_add", 23, "Zero plus segment", "seg_zero_add", "0 + AB = AB", ["seg.add_zero"], "exact seg_zero_add"),
  E("seg.comm", 24, "Segment addition commutes", "seg_comm", "AB + BC = BC + AB", ["seg.zero_add"], "exact seg_comm"),
  E("seg.assoc", 25, "Segment concatenation associates", "seg_assoc", "(AB + BC) + CD = AB + (BC + CD)", ["seg.comm"], "exact seg_assoc"),
  E("seg.congr", 26, "Equal segments stay equal after extending", "seg_congr_right", "AB = CD → AB + E = CD + E", ["seg.assoc"], "exact seg_congr_right"),
  // Chapter 10 — Triangle perimeters.
  E("tri.345", 27, "3-4-5 triangle", "tri_perim_345", "3 + 4 + 5 = 12", ["seg.congr"], "rfl"),
  E("tri.equilateral3", 28, "Equilateral triangle, side 3", "tri_perim_equilateral3", "3 + 3 + 3 = 9", ["tri.345"], "rfl"),
  E("tri.isosceles558", 29, "Isosceles triangle 5-5-8", "tri_perim_isosceles558", "5 + 5 + 8 = 18", ["tri.equilateral3"], "rfl"),
  E("tri.equilateral5", 30, "Equilateral triangle, side 5", "tri_perim_equilateral5", "5 + 5 + 5 = 15", ["tri.isosceles558"], "rfl"),
  E("tri.6810", 31, "6-8-10 triangle", "tri_perim_6810", "6 + 8 + 10 = 24", ["tri.equilateral5"], "rfl"),
  E("tri.equilateral4", 32, "Equilateral triangle, side 4", "tri_perim_equilateral4", "4 + 4 + 4 = 12", ["tri.6810"], "rfl"),
  // Chapter 11 — Quadrilaterals and regular polygons.
  E("rect.35", 33, "Rectangle 3 × 5", "rect_perim_35", "2*3 + 2*5 = 16", ["tri.equilateral4"], "rfl"),
  E("square.4", 34, "Square, side 4", "square_perim_4", "4 * 4 = 16", ["rect.35"], "rfl"),
  E("rect.46", 35, "Rectangle 4 × 6", "rect_perim_46", "2*4 + 2*6 = 20", ["square.4"], "rfl"),
  E("square.5", 36, "Square, side 5", "square_perim_5", "5 * 5 = 25", ["rect.46"], "rfl"),
  E("pentagon.3", 37, "Regular pentagon, side 3", "pentagon_perim_3", "3 * 5 = 15", ["square.5"], "rfl"),
  E("hexagon.4", 38, "Regular hexagon, side 4", "hexagon_perim_4", "4 * 6 = 24", ["pentagon.3"], "rfl"),
  E("perim.swap", 39, "Swap two sides, keep perimeter", "perim_swap", "a + b + c = b + a + c", ["hexagon.4"], "exact perim_swap"),
];

export const NATURAL_NUMBERS_LESSON: Lesson = {
  id: "natural-numbers",
  title: "Interactive Proofs: Numbers, Arithmetic & Geometry",
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
