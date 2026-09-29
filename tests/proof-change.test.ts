import assert from 'node:assert/strict';
import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { addTerm } from '../src/library/nat';
import { tacticSession } from '../src/proof/tactic';
import { initialProofState } from '../src/proof/state';
import { Nat, Type, Zero, app, eq, lambda, pi, succ, variable } from '../src/syntax/ast';

test('change exposes an equivalent target and the proof checks against the original target', () => {
  const target = eq(Nat, addTerm(Zero, Zero), Zero);
  const original = tacticSession(initialProofState(target));
  const changed = original.change(eq(Nat, Zero, Zero));
  assert.equal(changed.currentGoal()!.type.kind, 'Eq');
  assert.equal(changed.currentGoal()!.id, original.currentGoal()!.id);
  assert.equal(original.currentGoal()!.type, target);
  check([], changed.rfl().proof(), target);
});

test('change checks types in the focused local context', () => {
  const target = pi(Nat, eq(Nat, addTerm(Zero, variable(0)), variable(0)), 'n');
  const session = tacticSession(initialProofState(target)).intro();
  const changed = session.change(eq(Nat, variable(0), variable(0)));
  assert.deepEqual(changed.currentGoal()!.context, session.currentGoal()!.context);
  check([], changed.rfl().proof(), target);
});

test('change preserves the focused case and all sibling goals', () => {
  const theorem = lambda(Nat, lambda(Nat, Zero));
  const split = tacticSession({ goals: [{ context: [], type: Nat, caseName: 'branch' }] }).apply(theorem);
  const second = split.state.goals[1].id!;
  const focused = split.focusGoal(second);
  const changed = focused.change(app(lambda(Type, variable(0)), Nat));
  assert.equal(changed.state.focusedGoalId, second);
  assert.deepEqual(changed.state.goals[0], focused.state.goals[0]);
  assert.equal(changed.currentGoal()!.caseName, focused.currentGoal()!.caseName);
  check([], changed.exact(Zero).exact(Zero).proof(), Nat);
});

test('change preserves explicit case metadata', () => {
  const original = tacticSession({ goals: [{ context: [], type: Nat, caseName: 'base' }] });
  assert.equal(original.change(Nat).currentGoal()!.caseName, 'base');
});

test('change rejects unrelated, non-type and ill-scoped targets without mutation', () => {
  const original = tacticSession(initialProofState(Nat));
  const before = original.state;
  assert.throws(() => original.change(Type), /definitionally equal/);
  assert.throws(() => original.change(Zero), /Type mismatch/);
  assert.throws(() => original.change(variable(0)), /Unbound variable/);
  assert.throws(() => original.change(eq(Nat, Zero, succ(Zero))), /definitionally equal/);
  assert.equal(original.state, before);
  check([], original.exact(Zero).proof(), Nat);
});

test('change rejects a completed session', () => {
  assert.throws(() => tacticSession(initialProofState(Nat)).exact(Zero).change(Nat), /No goals remain/);
});
