import type { ProofStateView, ProofResult } from "./proof-engine";

export interface TutorialTheorem {
  readonly id: string;
  readonly title: string;
  readonly engineTheoremId: string | null;
  readonly available: boolean;
  readonly countsAsCompleted: boolean;
  readonly availabilityNote?: string;
}

export interface Lesson {
  readonly id: string;
  readonly title: string;
  readonly theorems: readonly TutorialTheorem[];
}

export interface LessonProgress {
  readonly completedTheorems: readonly string[];
}

export const NATURAL_NUMBERS_LESSON: Lesson = {
  id: "natural-numbers",
  title: "Natural Numbers",
  theorems: [
    { id: "zero", title: "01 Zero", engineTheoremId: "zero", available: true, countsAsCompleted: true },
    { id: "equality", title: "02 Equality", engineTheoremId: "identity", available: true, countsAsCompleted: true },
    {
      id: "addition",
      title: "03 Addition",
      engineTheoremId: "zero_plus_n",
      available: true,
      countsAsCompleted: false,
      availabilityNote: "The current Proof Engine can prove 0 + n = n by definitional equality, but n + 0 = n still requires a proof capability not available in M17.",
    },
    {
      id: "addition-successor",
      title: "04 Addition: Successor",
      engineTheoremId: null,
      available: false,
      countsAsCompleted: false,
      availabilityNote: "Tutorial content is available, but the current Proof Engine does not provide the proof capability required for this theorem.",
    },
  ],
};

export function initialLessonProgress(): LessonProgress {
  return { completedTheorems: [] };
}

export function recordProofResult(progress: LessonProgress, theorem: TutorialTheorem, result: ProofResult): LessonProgress {
  if (result.kind !== "success" || !result.state.completed || !theorem.available || !theorem.countsAsCompleted) return progress;
  if (progress.completedTheorems.includes(theorem.id)) return progress;
  return { completedTheorems: [...progress.completedTheorems, theorem.id] };
}

export function isCompleted(progress: LessonProgress, theoremId: string): boolean {
  return progress.completedTheorems.includes(theoremId);
}

export function nextTheorem(lesson: Lesson, theoremId: string): TutorialTheorem | null {
  const index = lesson.theorems.findIndex((theorem) => theorem.id === theoremId);
  return index >= 0 ? lesson.theorems[index + 1] ?? null : null;
}

export function initialTheoremState(theorem: TutorialTheorem, load: (engineId: string) => ProofStateView): ProofStateView | null {
  return theorem.engineTheoremId ? load(theorem.engineTheoremId) : null;
}
