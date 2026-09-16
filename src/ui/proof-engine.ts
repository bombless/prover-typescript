import { elaborate } from "../elaborator/elaborate";
import { parse } from "../parser/parser";
import { proofState, type ProofState } from "../proof/state";
import { tacticSession, TacticError, type TacticSession } from "../proof/tactic";
import { show } from "../kernel/typecheck";
import { type Term as CoreTerm, Nat, Zero, variable, pi, eq } from "../syntax/ast";
import { addTerm } from "../library/nat";

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

function cloneMockState(state: ProofStateView): ProofStateView {
  return { theoremName: state.theoremName, completed: state.completed, goals: state.goals.map((goal) => ({ id: goal.id, target: goal.target, context: goal.context.map((entry) => ({ ...entry })) })) };
}
function initialState(theorem: MockTheorem): ProofStateView { return cloneMockState({ theoremName: theorem.name, goals: theorem.goals, completed: theorem.goals.length === 0 }); }

export class MockProofEngine implements ProofEngine {
  private state = initialState(MOCK_THEOREMS.n_plus_zero);
  loadTheorem(id: string): ProofStateView { const theorem = MOCK_THEOREMS[id] ?? MOCK_THEOREMS.n_plus_zero; this.state = initialState(theorem); return cloneMockState(this.state); }
  runTactic(tactic: string): ProofResult {
    const normalized = tactic.trim().toLowerCase();
    if (!normalized) return { kind: "error", message: "Enter a tactic before applying it.", state: cloneMockState(this.state) };
    if (this.state.completed) return { kind: "error", message: "There are no goals left to solve.", state: cloneMockState(this.state) };
    const currentGoal = this.state.goals[0];
    if (normalized === "rfl" && ["0 = 0", "n = n"].includes(currentGoal.target)) {
      this.state = { ...this.state, goals: this.state.goals.slice(1), completed: this.state.goals.length === 1 };
      return { kind: "success", message: this.state.completed ? "Mock proof completed" : undefined, state: cloneMockState(this.state) };
    }
    if (normalized === "rfl" && currentGoal.target === "n + 0 = n") return { kind: "error", message: "rfl cannot solve this goal in mock mode.", state: cloneMockState(this.state) };
    if (normalized === "intro") {
      const nextGoal = { ...currentGoal, target: currentGoal.target === "n + 0 = n" ? "0 = 0" : currentGoal.target };
      this.state = { ...this.state, goals: [nextGoal, ...this.state.goals.slice(1)] };
      return { kind: "success", state: cloneMockState(this.state) };
    }
    if (normalized === "assumption" && /^\w+ = \w+$/.test(currentGoal.target)) {
      const [left, right] = currentGoal.target.split(" = ");
      if (left === right && currentGoal.context.some((entry) => entry.name === left)) {
        this.state = { ...this.state, goals: this.state.goals.slice(1), completed: this.state.goals.length === 1 };
        return { kind: "success", message: this.state.completed ? "Mock proof completed" : undefined, state: cloneMockState(this.state) };
      }
    }
    return { kind: "error", message: `${normalized} cannot solve the focused goal in mock mode.`, state: cloneMockState(this.state) };
  }
}

interface RealTheorem { readonly name: string; readonly type: CoreTerm; }

const REAL_THEOREMS: Record<string, RealTheorem> = {
  zero: { name: "zero", type: { kind: "Eq", type: { kind: "Nat" }, left: { kind: "Zero" }, right: { kind: "Zero" } } },
  identity: { name: "identity", type: { kind: "Pi", domain: { kind: "Nat" }, body: { kind: "Eq", type: { kind: "Nat" }, left: { kind: "Var", index: 0, name: "n" }, right: { kind: "Var", index: 0, name: "n" } }, name: "n" } },
  zero_plus_n: { name: "zero_plus_n", type: pi(Nat, eq(Nat, addTerm(Zero, variable(0, "n")), variable(0, "n")), "n") },
  assumption: { name: "assumption", type: { kind: "Pi", domain: { kind: "Nat" }, body: { kind: "Pi", domain: { kind: "Eq", type: { kind: "Nat" }, left: { kind: "Var", index: 0, name: "n" }, right: { kind: "Var", index: 0, name: "n" } }, body: { kind: "Eq", type: { kind: "Nat" }, left: { kind: "Var", index: 1, name: "n" }, right: { kind: "Var", index: 1, name: "n" } }, name: "h" }, name: "n" } },
  apply: { name: "apply", type: { kind: "Eq", type: { kind: "Nat" }, left: { kind: "Zero" }, right: { kind: "Zero" } } },
};

function cloneView(state: ProofStateView): ProofStateView {
  return { theoremName: state.theoremName, completed: state.completed, goals: state.goals.map((goal) => ({ id: goal.id, target: goal.target, context: goal.context.map((entry) => ({ ...entry })) })) };
}

function toView(theoremName: string, state: ProofState): ProofStateView {
  return {
    theoremName,
    completed: state.goals.length === 0,
    goals: state.goals.map((goal) => ({ id: String(goal.id), target: show(goal.type), context: goal.context.map((entry) => ({ name: entry.name, type: show(entry.type) })) })),
  };
}

function parseArgument(source: string, context: readonly { name: string }[]): CoreTerm {
  return elaborate(parse(source), context.map((entry) => entry.name));
}

export class RealProofEngine implements ProofEngine {
  private theoremName = "zero";
  private session: TacticSession = tacticSession(proofState([{ context: [], type: { kind: "Eq", type: { kind: "Nat" }, left: { kind: "Zero" }, right: { kind: "Zero" } } }]));

  loadTheorem(id: string): ProofStateView {
    const theorem = REAL_THEOREMS[id] ?? REAL_THEOREMS.zero;
    this.theoremName = theorem.name;
    this.session = tacticSession(proofState([{ context: [], type: theorem.type }]));
    return cloneView(toView(this.theoremName, this.session.state));
  }

  runTactic(tactic: string): ProofResult {
    const source = tactic.trim();
    const currentView = () => cloneView(toView(this.theoremName, this.session.state));
    if (!source) return { kind: "error", message: "Enter a tactic before applying it.", state: currentView() };
    if (this.session.state.goals.length === 0) return { kind: "error", message: "There are no goals left to solve.", state: currentView() };
    const [name, ...parts] = source.split(/\s+/);
    const argument = parts.join(" ");
    try {
      switch (name.toLowerCase()) {
        case "intro":
          if (argument) throw new TacticError("intro does not take an argument");
          this.session = this.session.intro();
          break;
        case "rfl":
          if (argument) throw new TacticError("rfl does not take an argument");
          this.session = this.session.rfl();
          break;
        case "assumption":
          if (argument) throw new TacticError("assumption does not take an argument");
          this.session = this.session.assumption();
          break;
        case "exact": {
          if (!argument) throw new TacticError("exact expects a term");
          const goal = this.session.currentGoal();
          if (!goal) throw new TacticError("No goals remain");
          this.session = this.session.exact(parseArgument(argument, goal.context));
          break;
        }
        case "apply": {
          if (!argument) throw new TacticError("apply expects a term");
          const goal = this.session.currentGoal();
          if (!goal) throw new TacticError("No goals remain");
          this.session = this.session.apply(parseArgument(argument, goal.context));
          break;
        }
        default:
          throw new TacticError(`Unknown tactic: ${name}`);
      }
      const state = toView(this.theoremName, this.session.state);
      if (state.completed) {
        this.session.proof();
        return { kind: "success", message: "Proof accepted", state: cloneView(state) };
      }
      return { kind: "success", message: "Proof state updated", state: cloneView(state) };
    } catch (error) {
      return { kind: "error", message: error instanceof Error ? error.message : String(error), state: currentView() };
    }
  }
}

export const MOCK_THEOREM_LIST = [
  { id: "zero", label: "01  Zero" },
  { id: "n_plus_zero", label: "02  Addition" },
  { id: "zero_plus_n", label: "03  Add one" },
  { id: "identity", label: "04  Identity" },
];
export const MOCK_MULTI_GOAL_ID = "multi_goal";

export const REAL_THEOREM_LIST = [
  { id: "zero", label: "01  Zero" },
  { id: "identity", label: "02  Identity" },
  { id: "assumption", label: "03  Assumption" },
  { id: "apply", label: "04  Apply" },
];
