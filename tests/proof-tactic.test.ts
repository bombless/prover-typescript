import assert from 'node:assert/strict';
import test from 'node:test';
import { definitionalEqual } from '../src/kernel/reduction';
import { infer } from '../src/kernel/typecheck';
import { tacticSession } from '../src/proof/tactic';
import { initialProofState } from '../src/proof/state';
import { Nat, Type, app, eq, lambda, pi, piImplicit, variable } from '../src/syntax/ast';

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

test('M21 rewrite changes a predicate target through an equality proof', () => {
  const predicate = pi(Nat, Type, 'P');
  const equality = eq(Nat, variable(1, 'a'), variable(0, 'b'));
  const target = app(variable(3, 'P'), variable(2, 'a'));
  const state = { goals: [{ context: [
    { name: 'P', type: predicate },
    { name: 'a', type: Nat },
    { name: 'b', type: Nat },
    { name: 'h', type: equality },
  ], type: target }] };
  const session = tacticSession(state).rewrite(variable(0, 'h'));
  assert.deepEqual(session.state.goals[0].type, app(variable(3, 'P'), variable(1, 'b')));
});

test('M21 rewrite constructs a Kernel-checkable EqRec proof', () => {
  const equality = eq(Nat, variable(1, 'a'), variable(0, 'b'));
  const fType = pi(Nat, Nat, 'x');
  const target = eq(Nat, app(variable(3, 'f'), variable(2, 'a')), app(variable(3, 'f'), variable(2, 'a')));
  const state = { goals: [{ context: [
    { name: 'f', type: fType },
    { name: 'a', type: Nat },
    { name: 'b', type: Nat },
    { name: 'h', type: equality },
  ], type: target }] };
  const completed = tacticSession(state).rewrite(variable(0, 'h')).rfl();
  const proof = completed.proof();
  assert.equal(proof.kind, 'EqRec');
  assert.ok(definitionalEqual(infer(state.goals[0].context.map((entry) => entry.type), proof), target));
});

test('M21 rewrite rejects non-equality hypotheses and missing matches without mutation', () => {
  const nonEquality = { goals: [{ context: [{ name: 'h', type: Nat }], type: Nat }] };
  const session = tacticSession(nonEquality);
  const before = session.state;
  assert.throws(() => session.rewrite(variable(0, 'h')), /rewrite expected an equality proof/);
  assert.equal(session.state, before);

  const equality = eq(Nat, variable(0, 'a'), variable(0, 'a'));
  const missing = tacticSession({ goals: [{ context: [{ name: 'a', type: Nat }, { name: 'h', type: equality }], type: Nat }] });
  const missingBefore = missing.state;
  assert.throws(() => missing.rewrite(variable(0, 'h')), /rewrite found no match/);
  assert.equal(missing.state, missingBefore);
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

test('apply rejects result mismatches', () => {
  const wrong = { goals: [{ context: [{ name: 'h', type: pi(Nat, Nat, 'n') }], type: Type }] };
  assert.throws(() => tacticSession(wrong).apply(variable(0, 'h')), /Cannot unify|result mismatch/);
});

test('M19 apply uses unification to solve a dependent theorem argument', () => {
  const predicate = pi(Nat, Type, 'P');
  const theoremType = pi(Nat, app(variable(1, 'P'), variable(0, 'n')), 'n');
  const goalType = app(variable(1, 'P'), { kind: 'Zero' });
  const state = { goals: [{ context: [{ name: 'P', type: predicate }, { name: 'h', type: theoremType }], type: goalType }] };
  const session = tacticSession(state).apply(variable(0, 'h'));
  assert.equal(session.state.goals.length, 0);
  assert.equal(session.proof().kind, 'App');
});

test('M20 apply infers a single implicit type argument from the goal', () => {
  const identityType = piImplicit(Type, pi(variable(0, 'A'), variable(1, 'A'), 'x'), 'A');
  const state = { goals: [{ context: [{ name: 'id', type: identityType }, { name: 'n', type: Nat }], type: Nat }] };
  const session = tacticSession(state).apply(variable(1, 'id'));
  assert.equal(session.state.goals.length, 1);
  assert.deepEqual(session.state.goals[0].type, Nat);
  const proof = session.exact(variable(0, 'n')).proof();
  assert.equal(proof.kind, 'App');
  assert.ok(definitionalEqual(infer(state.goals[0].context.map((entry) => entry.type), proof), Nat));
});

test('M20 infers an implicit argument through application unification', () => {
  const predicate = pi(Type, Type, 'P');
  const theoremType = piImplicit(Type, app(variable(1, 'P'), variable(0, 'A')), 'A');
  const goalType = app(variable(1, 'P'), Nat);
  const state = { goals: [{ context: [{ name: 'P', type: predicate }, { name: 'h', type: theoremType }], type: goalType }] };
  const session = tacticSession(state).apply(variable(0, 'h'));
  assert.equal(session.state.goals.length, 0);
  assert.equal(session.proof().kind, 'App');
});

test('M20 supports multiple implicit arguments', () => {
  const theoremType = piImplicit(Type,
    piImplicit(Type,
      eq(Type, variable(1, 'A'), variable(0, 'B')), 'B'), 'A');
  const goalType = eq(Type, Nat, Nat);
  const state = { goals: [{ context: [{ name: 'h', type: theoremType }], type: goalType }] };
  const session = tacticSession(state).apply(variable(0, 'h'));
  assert.equal(session.state.goals.length, 0);
  assert.equal(session.proof().kind, 'App');
});

test('M20 explicit and implicit arguments do not get mixed', () => {
  const theoremType = piImplicit(Type, pi(Nat, variable(1, 'A'), 'x'), 'A');
  const state = { goals: [{ context: [{ name: 'h', type: theoremType }, { name: 'x', type: Nat }], type: Nat }] };
  const session = tacticSession(state).apply(variable(1, 'h'));
  assert.equal(session.state.goals.length, 1);
  assert.deepEqual(session.state.goals[0].type, Nat);
  assert.equal(session.exact(variable(0, 'x')).proof().kind, 'App');
});

test('M20 failed implicit inference is explicit and leaves the session unchanged', () => {
  const theoremType = piImplicit(Type, pi(Type, Type, 'value'), 'A');
  const state = { goals: [{ context: [{ name: 'h', type: theoremType }], type: Type }] };
  const session = tacticSession(state);
  const before = session.state;
  assert.throws(() => session.apply(variable(0, 'h')), /Could not infer implicit argument/);
  assert.equal(session.state, before);
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
