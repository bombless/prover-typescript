import { Term } from '../syntax/ast';

export type GoalId = number;

/** A local proof-state binding: the name is presentation metadata, the type is Core. */
export interface ContextEntry {
  readonly name: string;
  readonly type: Term;
}

export type Context = readonly ContextEntry[];

export interface Goal {
  readonly id?: GoalId;
  readonly context: Context;
  readonly type: Term;
  readonly caseName?: string;
}

export interface ProofState {
  readonly goals: readonly Goal[];
  readonly focusedGoalId: GoalId | null;
}

let nextGoalId = 0;

function validateGoalId(id: GoalId): void {
  if (!Number.isSafeInteger(id) || id < 0) {
    throw new RangeError('Goal ID must be a non-negative safe integer');
  }
}

function freshGoalId(): GoalId {
  if (!Number.isSafeInteger(nextGoalId)) throw new RangeError('Goal ID space exhausted');
  return nextGoalId++;
}

export function goal(context: Context, type: Term, caseName?: string, id: GoalId = freshGoalId()): Goal {
  validateGoalId(id);
  if (id >= nextGoalId) nextGoalId = id + 1;
  return { id, context: [...context], type, ...(caseName === undefined ? {} : { caseName }) };
}

function normalizeGoals(goals: readonly Goal[]): Goal[] {
  // Validate the entire input before advancing the process-wide allocator.
  for (const { id } of goals) {
    if (id !== undefined) validateGoalId(id);
  }
  // Reserve caller-supplied identities before allocating missing or duplicate IDs.
  for (const { id } of goals) {
    if (id !== undefined && id >= nextGoalId) nextGoalId = id + 1;
  }
  const used = new Set<GoalId>();
  return goals.map(({ id, context, type, caseName }) => {
    let stableId = id ?? freshGoalId();
    if (used.has(stableId)) stableId = freshGoalId();
    used.add(stableId);
    return goal(context, type, caseName, stableId);
  });
}

export function proofState(goals: readonly Goal[], focusedGoalId?: GoalId | null): ProofState {
  if (focusedGoalId !== undefined && focusedGoalId !== null) validateGoalId(focusedGoalId);
  const normalized = normalizeGoals(goals);
  if (normalized.length === 0) return { goals: [], focusedGoalId: null };
  const nextFocus = focusedGoalId ?? normalized[0].id!;
  if (!normalized.some(item => item.id === nextFocus)) {
    throw new RangeError(`Focused goal does not exist: ${String(nextFocus)}`);
  }
  return { goals: normalized, focusedGoalId: nextFocus };
}

export function initialProofState(type: Term): ProofState {
  return proofState([goal([], type)]);
}

export function currentGoal(state: ProofState): Goal | undefined {
  return state.goals.find(item => item.id === state.focusedGoalId);
}

export function focusGoal(state: ProofState, id: GoalId): ProofState {
  if (!state.goals.some(item => item.id === id)) throw new RangeError(`Goal id not found: ${id}`);
  return proofState(state.goals, id);
}

export function focusNext(state: ProofState): ProofState {
  if (state.goals.length === 0) return proofState([]);
  const index = state.goals.findIndex(item => item.id === state.focusedGoalId);
  if (index < 0) throw new RangeError('Focused goal does not exist');
  return focusGoal(state, state.goals[(index + 1) % state.goals.length].id!);
}

export function focusPrevious(state: ProofState): ProofState {
  if (state.goals.length === 0) return proofState([]);
  const index = state.goals.findIndex(item => item.id === state.focusedGoalId);
  if (index < 0) throw new RangeError('Focused goal does not exist');
  return focusGoal(state, state.goals[(index - 1 + state.goals.length) % state.goals.length].id!);
}

export function replaceGoal(state: ProofState, index: number, replacement: readonly Goal[]): ProofState {
  if (!Number.isInteger(index) || index < 0 || index >= state.goals.length) {
    throw new RangeError(`Goal index out of range: ${index}`);
  }
  const nextGoals = [
    ...state.goals.slice(0, index),
    ...replacement,
    ...state.goals.slice(index + 1),
  ];
  const nextFocus = nextGoals.some(item => item.id === state.focusedGoalId)
    ? state.focusedGoalId
    : (nextGoals[index]?.id ?? nextGoals[index - 1]?.id ?? null);
  return proofState(nextGoals, nextFocus);
}




