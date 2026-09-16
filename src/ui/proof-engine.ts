export interface ContextEntryView { name: string; type: string; }
export interface GoalView { id: string; target: string; context: ContextEntryView[]; }
export interface ProofStateView { theoremName: string; goals: GoalView[]; completed: boolean; }
export type ProofResult = { kind: "success"; state: ProofStateView; message?: string } | { kind: "error"; message: string; state: ProofStateView };
export interface ProofEngine { loadTheorem(id: string): ProofStateView; runTactic(tactic: string): ProofResult; }

interface MockTheorem { name: string; goals: GoalView[]; }
const MOCK_THEOREMS: Record<string, MockTheorem> = {
  zero: { name: "zero", goals: [{ id: "zero-1", target: "0 = 0", context: [] }] },
  n_plus_zero: { name: "n_plus_zero", goals: [{ id: "n-plus-zero-1", target: "n + 0 = n", context: [{ name: "n", type: "Nat" }] }] },
  zero_plus_n: { name: "zero_plus_n", goals: [{ id: "zero-plus-n-1", target: "0 + n = n", context: [{ name: "n", type: "Nat" }] }] },
  identity: { name: "identity", goals: [{ id: "identity-1", target: "n = n", context: [{ name: "n", type: "Nat" }] }] },
  multi_goal: { name: "multi_goal", goals: [
    { id: "multi-1", target: "m + 0 = m", context: [{ name: "m", type: "Nat" }] },
    { id: "multi-2", target: "Succ m + 0 = Succ m", context: [{ name: "m", type: "Nat" }] },
  ] },
};

function cloneState(state: ProofStateView): ProofStateView {
  return { theoremName: state.theoremName, completed: state.completed, goals: state.goals.map((goal) => ({ id: goal.id, target: goal.target, context: goal.context.map((entry) => ({ ...entry })) })) };
}
function initialState(theorem: MockTheorem): ProofStateView { return cloneState({ theoremName: theorem.name, goals: theorem.goals, completed: theorem.goals.length === 0 }); }

export class MockProofEngine implements ProofEngine {
  private state = initialState(MOCK_THEOREMS.n_plus_zero);
  loadTheorem(id: string): ProofStateView { const theorem = MOCK_THEOREMS[id] ?? MOCK_THEOREMS.n_plus_zero; this.state = initialState(theorem); return cloneState(this.state); }
  runTactic(tactic: string): ProofResult {
    const normalized = tactic.trim().toLowerCase();
    if (!normalized) return { kind: "error", message: "Enter a tactic before applying it.", state: cloneState(this.state) };
    if (this.state.completed) return { kind: "error", message: "There are no goals left to solve.", state: cloneState(this.state) };
    const currentGoal = this.state.goals[0];
    if (normalized === "rfl" && ["0 = 0", "n = n"].includes(currentGoal.target)) {
      this.state = { ...this.state, goals: this.state.goals.slice(1), completed: this.state.goals.length === 1 };
      return { kind: "success", message: this.state.completed ? "Mock proof completed" : undefined, state: cloneState(this.state) };
    }
    if (normalized === "rfl" && currentGoal.target === "n + 0 = n") return { kind: "error", message: "rfl cannot solve this goal in mock mode.", state: cloneState(this.state) };
    if (normalized === "intro") {
      const nextGoal = { ...currentGoal, target: currentGoal.target === "n + 0 = n" ? "0 = 0" : currentGoal.target };
      this.state = { ...this.state, goals: [nextGoal, ...this.state.goals.slice(1)] };
      return { kind: "success", state: cloneState(this.state) };
    }
    if (normalized === "assumption" && /^\w+ = \w+$/.test(currentGoal.target)) {
      const [left, right] = currentGoal.target.split(" = ");
      if (left === right && currentGoal.context.some((entry) => entry.name === left)) {
        this.state = { ...this.state, goals: this.state.goals.slice(1), completed: this.state.goals.length === 1 };
        return { kind: "success", message: this.state.completed ? "Mock proof completed" : undefined, state: cloneState(this.state) };
      }
    }
    return { kind: "error", message: `${normalized} cannot solve the focused goal in mock mode.`, state: cloneState(this.state) };
  }
}

export const MOCK_THEOREM_LIST = [
  { id: "zero", label: "01  Zero" },
  { id: "n_plus_zero", label: "02  Addition" },
  { id: "zero_plus_n", label: "03  Add one" },
  { id: "identity", label: "04  Identity" },
];
export const MOCK_MULTI_GOAL_ID = "multi_goal";
