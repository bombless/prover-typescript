import type { ProofStateView } from "./proof-engine";

export interface NarrationStep { readonly tactic: string; readonly title: string; readonly explanation: string; }
const targetOf = (state: ProofStateView | null) => state?.goals[0]?.target ?? "the remaining theorem";
export function narrateStep(tactic: string, before: ProofStateView | null, after: ProofStateView | null): NarrationStep {
  const normalized = tactic.trim(), lower = normalized.toLowerCase(), beforeTarget = targetOf(before), afterTarget = targetOf(after);
  if (lower === "intro") { const introduced = after?.goals[0]?.context.at(-1)?.name; return { tactic: normalized, title: "Introduce an assumption", explanation: introduced ? `We introduce ${introduced} into the local context. The remaining goal is ${afterTarget}.` : `We introduce the next assumption. The remaining goal is ${afterTarget}.` }; }
  if (lower === "rfl") return { tactic: normalized, title: "Use reflexivity", explanation: `The goal ${beforeTarget} is definitionally equal on both sides, so reflexivity closes it.` };
  if (lower === "assumption") return { tactic: normalized, title: "Use a local hypothesis", explanation: `A hypothesis already available in the local context matches ${beforeTarget}, so we can use it directly.` };
  if (lower.startsWith("exact ")) { const theorem = normalized.slice(6).trim(); return { tactic: normalized, title: "Give an exact proof", explanation: `We provide ${theorem} as the proof of the current goal ${beforeTarget}.` }; }
  if (lower.startsWith("apply ")) { const theorem = normalized.slice(6).trim(); return { tactic: normalized, title: "Apply a theorem", explanation: `We apply ${theorem}. Any premises that remain become new proof goals.` }; }
  if (lower.startsWith("rewrite ")) { const hypothesis = normalized.slice(8).trim() || "the equality hypothesis"; return { tactic: normalized, title: "Rewrite using equality", explanation: `Using ${hypothesis}, we replace an equal expression in the goal. The remaining target is ${afterTarget}.` }; }
  if (lower.startsWith("induction ")) { const variable = normalized.slice(10).trim() || "the natural number"; const count = after?.goals.length ?? 0; return { tactic: normalized, title: "Split by induction", explanation: `We prove the statement by induction on ${variable}. The proof engine now has ${count} case${count === 1 ? "" : "s"} to solve.` }; }
  return { tactic: normalized, title: "Continue the proof", explanation: `The tactic changes the proof state. The next target is ${afterTarget}.` };
}
