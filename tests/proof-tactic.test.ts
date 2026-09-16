import assert from 'node:assert/strict';
import test from 'node:test';
import { definitionalEqual } from '../src/kernel/reduction';
import { infer } from '../src/kernel/typecheck';
import { tacticSession } from '../src/proof/tactic';
import { initialProofState } from '../src/proof/state';
import { Nat, Type, app, eq, lambda, pi, variable } from '../src/syntax/ast';

const idType = pi(Type, pi(variable(0), variable(1, 'A'), 'x'), 'A');

test('intro creates a local hypothesis without mutating the original state', () => {
  const original = initialProofState(idType);
  const next = tacticSession(original).intro();
  assert.equal(original.goals[0].type, idType);
  assert.equal(next.state.goals[0].context[0].name, 'A');
  assert.equal(next.state.goals[0].type.kind, 'Pi');
});

test('intro rejects a non-Pi goal', () => {
  assert.throws(() => tacticSession(initialProofState(Nat)).intro(), /intro expected/);
});

test('exact accepts a correct term and rejects a wrong type', () => {
  const session = tacticSession(initialProofState(Nat));
  assert.equal(session.exact({ kind: 'Zero' }).state.goals.length, 0);
  assert.throws(() => session.exact(Type), /Type mismatch/);
});

test('intro and assumption build a Kernel-checkable identity proof', () => {
  const proof = tacticSession(initialProofState(idType)).intro().intro().assumption().proof();
  assert.ok(definitionalEqual(infer([], proof), idType));
});

test('rfl proves reflexive and definitionally equal equality goals', () => {
  const goal = eq(Nat, variable(0, 'n'), variable(0, 'n'));
  const proof = tacticSession({ goals: [{ context: [{ name: 'n', type: Nat }], type: goal }] }).rfl().proof();
  assert.equal(proof.kind, 'Refl');
  const betaGoal = eq(Nat, app(lambda(Nat, variable(0)), { kind: 'Zero' }), { kind: 'Zero' });
  assert.equal(tacticSession(initialProofState(betaGoal)).rfl().proof().kind, 'Refl');
});

test('rfl rejects a non-definitional equality', () => {
  const goal = eq(Nat, { kind: 'Zero' }, { kind: 'Succ', value: { kind: 'Zero' } });
  assert.throws(() => tacticSession(initialProofState(goal)).rfl(), /rfl requires/);
});

test('assumption finds a matching local hypothesis and fails otherwise', () => {
  const hypothesisType = eq(Nat, variable(0, 'n'), variable(0, 'n'));
  const goalType = eq(Nat, variable(1, 'n'), variable(1, 'n'));
  const state = { goals: [{ context: [{ name: 'n', type: Nat }, { name: 'h', type: hypothesisType }], type: goalType }] };
  const proof = tacticSession(state).assumption().proof();
  assert.equal(proof.kind, 'Var');
  assert.equal(proof.index, 0);
  assert.throws(() => tacticSession(initialProofState(Nat)).assumption(), /assumption found no local hypothesis/);
});

test('apply creates explicit argument goals for a non-dependent function', () => {
  const functionType = pi(Nat, pi(Nat, Nat, 'b'), 'a');
  const state = { goals: [{ context: [{ name: 'h', type: functionType }], type: Nat }] };
  const session = tacticSession(state).apply(variable(0, 'h'));
  assert.equal(session.state.goals.length, 2);
  const solved = session.exact({ kind: 'Zero' }).exact({ kind: 'Zero' });
  assert.equal(solved.proof().kind, 'App');
});

test('apply rejects result mismatches and dependent argument inference', () => {
  const wrong = { goals: [{ context: [{ name: 'h', type: pi(Nat, Nat, 'n') }], type: Type }] };
  assert.throws(() => tacticSession(wrong).apply(variable(0, 'h')), /apply result mismatch/);
  const dependent = { goals: [{ context: [{ name: 'h', type: pi(Nat, variable(0, 'n'), 'n') }], type: Nat }] };
  assert.throws(() => tacticSession(dependent).apply(variable(0, 'h')), /does not support dependent/);
});

test('failed tactics leave the original session unchanged', () => {
  const session = tacticSession(initialProofState(Nat));
  assert.throws(() => session.exact(Type));
  assert.equal(session.state.goals.length, 1);
});

test('tactics operate only on the focused goal and completion advances focus', () => {
  const functionType = pi(Nat, pi(Nat, Nat, 'b'), 'a');
  const state = { goals: [{ context: [{ name: 'h', type: functionType }], type: Nat }] };
  const session = tacticSession(state).apply(variable(0, 'h'));
  const ids = session.state.goals.map(goal => goal.id!);
  const second = session.focusGoal(ids[1]);
  assert.equal(second.state.focusedGoalId, ids[1]);
  const afterSecond = second.solveCurrentGoal({ kind: 'Zero' });
  assert.equal(afterSecond.state.goals.length, 1);
  assert.equal(afterSecond.state.goals[0].id, ids[0]);
  assert.equal(afterSecond.state.focusedGoalId, ids[0]);
  const completed = afterSecond.solveCurrentGoal({ kind: 'Zero' });
  assert.equal(completed.state.goals.length, 0);
  assert.equal(completed.state.focusedGoalId, null);
  assert.equal(completed.proof().kind, 'App');
});

test('invalid focus and failed focused-goal tactics leave the session unchanged', () => {
  const session = tacticSession(initialProofState(Nat));
  const before = session.state;
  assert.throws(() => session.focusGoal(999999), /Goal id not found/);
  assert.equal(session.state, before);
  assert.throws(() => session.solveCurrentGoal(Type));
  assert.equal(session.state.goals.length, 1);
  assert.equal(session.state.focusedGoalId, before.focusedGoalId);
});

test('case metadata survives tactic transitions and remains outside the proof term', () => {
  const state = { goals: [{ context: [], type: Nat, caseName: 'zero' }] };
  const completed = tacticSession(state).solveCurrentGoal({ kind: 'Zero' });
  assert.equal(completed.state.goals.length, 0);
  assert.equal(completed.proof().kind, 'Zero');
});
