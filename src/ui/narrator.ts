import type { ProofStateView } from "./proof-engine";

export interface NarrationStep {
  readonly tactic: string;
  readonly title: string;
  readonly explanation: string;
}

function targetOf(state: ProofStateView | null): string {
  return state?.goals[0]?.target ?? "the remaining theorem";
}

/**
 * Turns the proof-engine's user-visible tactic trace into a deterministic,
 * kernel-agnostic English narration. This is deliberately template based:
 * the text describes only facts exposed by the UI proof state and tactic log.
 */
export function narrateStep(tactic: string, before: ProofStateView | null, after: ProofStateView | null): NarrationStep {
  const normalized = tactic.trim();
  const lower = normalized.toLowerCase();
  const beforeTarget = targetOf(before);
  const afterTarget = targetOf(after);

  if (lower === "intro") {
    const introduced = after?.goals[0]?.context.at(-1)?.name;
    return {
      tactic: normalized,
      title: "Introduce an assumption",
      explanation: introduced
        ? `We introduce ${introduced} into the local context. The remaining goal is ${afterTarget}.`
        : `We introduce the next assumption. The remaining goal is ${afterTarget}.`,
    };
  }

  if (lower === "rfl") {
    return {
      tactic: normalized,
      title: "Use reflexivity",
      explanation: before?.completed || after?.completed
        ? `The goal ${beforeTarget} is definitionally equal on both sides, so reflexivity closes it.`
        : `The current goal is definitionally equal on both sides, so reflexivity reduces it to a solved goal.`,
    };
  }

  if (lower === "assumption") {
    return {
      tactic: normalized,
      title: "Use a local hypothesis",
      explanation: `A hypothesis already available in the local context matches ${beforeTarget}, so we can use it directly.`,
    };
  }

  if (lower.startsWith("exact ")) {
    const theorem = normalized.slice(6).trim();
    return {
      tactic: normalized,
      title: "Apply an exact proof",
      explanation: `We provide ${theorem} as the proof of the current goal ${beforeTarget}.`,
    };
  }

  if (lower.startsWith("apply ")) {
    const theorem = normalized.slice(6).trim();
    return {
      tactic: normalized,
      title: "Apply a theorem",
      explanation: `We apply ${theorem}. This replaces the current goal with the premises that still need to be proved.`,
    };
  }

  if (lower.startsWith("rewrite ")) {
    const hypothesis = normalized.slice(8).trim() || "the equality hypothesis";
    return {
      tactic: normalized,
      title: "Rewrite using equality",
      explanation: `Using ${hypothesis}, we replace an equal expression in the goal. The remaining target is ${afterTarget}.`,
    };
  }

  if (lower.startsWith("induction ")) {
    const variable = normalized.slice(10).trim() || "the natural number";
    const count = after?.goals.length ?? 0;
    return {
      tactic: normalized,
      title: "Split by induction",
      explanation: `We prove the statement by induction on ${variable}. The proof engine creates ${count || "the required"} remaining case${count === 1 ? "" : "s"} for the base and successor cases.`,
    };
  }

  return {
    tactic: normalized,
    title: "Continue the proof",
    explanation: `The tactic changes the proof state while preserving the theorem being proved. The next target is ${afterTarget}.`,
  };
}

export function narrateHistory(history: readonly string[], initial: ProofStateView | null, finalState: ProofStateView | null): NarrationStep[] {
  // The UI currently exposes tactic history but not a historical state for each
  // entry. Narration therefore uses the final state as a safe description target.
  // The before/after distinction is exact for single-step interaction and still
  // produces useful deterministic text for a completed trace.
  let current = initial;
  return history.map((tactic) => {
    const step = narrateStep(tactic, current, finalState);
    current = finalState;
    return step;
  });
}
