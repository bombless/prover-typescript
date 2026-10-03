import assert from 'node:assert/strict';
import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { tacticSession } from '../src/proof/tactic';
import { initialProofState } from '../src/proof/state';
import { Nat, Type, Zero, eq, lambda, pi, variable } from '../src/syntax/ast';

test('revert turns the newest local into a function goal and restores its proof', () => {
  const target = pi(Nat, eq(Nat, variable(0), variable(0)), 'n');
  const introduced = tacticSession(initialProofState(target)).intro();
  const reverted = introduced.revert('n');
  assert.equal(reverted.currentGoal()!.context.length, 0);
  assert.deepEqual(reverted.currentGoal()!.type, target);
  assert.equal(introduced.currentGoal()!.context.length, 1);
  check([], reverted.intro().rfl().proof(), target);
});

test('revert preserves dependent binder domains in an external root context', () => {
  const context = [{ name: 'A', type: Type }, { name: 'x', type: variable(0) }];
  const target = variable(1);
  const reverted = tacticSession({ goals: [{ context, type: target, caseName: 'local' }] }).revert();
  assert.deepEqual(reverted.currentGoal()!.context, context.slice(0, 1));
  assert.equal(reverted.currentGoal()!.caseName, 'local');
  const proof = reverted.intro().assumption().proof();
  check(context.map(entry => entry.type), proof, target);
});

test('revert supports consecutive dependent bindings without capture', () => {
  const target = pi(Type, pi(variable(0), variable(1), 'x'), 'A');
  const session = tacticSession(initialProofState(target)).intro().intro().revert().revert();
  assert.deepEqual(session.currentGoal()!.type, target);
  check([], session.intro().intro().assumption().proof(), target);
});

test('revert can use a supplied function proof without reintroducing the binder', () => {
  const target = pi(Nat, Nat, 'n');
  const proof = tacticSession(initialProofState(target)).intro().revert()
    .exact(lambda(Nat, variable(0))).proof();
  check([], proof, target);
});

test('revert affects only the focused goal and preserves its siblings', () => {
  const target = pi(Nat, Nat, 'n');
  const session = tacticSession(initialProofState(target)).intro().apply(lambda(Nat, lambda(Nat, Zero)));
  const second = session.state.goals[1];
  const changed = session.revert();
  assert.deepEqual(changed.state.goals[1], second);
  const proof = changed.intro().assumption().assumption().proof();
  check([], proof, target);
});

test('revert rejects older names and empty contexts without mutation', () => {
  const target = pi(Nat, pi(Nat, Nat, 'b'), 'a');
  const original = tacticSession(initialProofState(target)).intro().intro();
  const before = original.state;
  assert.throws(() => original.revert('a'), /newest local binding/);
  assert.throws(() => original.revert('missing'), /newest local binding/);
  assert.throws(() => original.revert(''), /newest local binding/);
  assert.equal(original.state, before);
  assert.throws(() => tacticSession(initialProofState(Nat)).revert(), /requires a local binding/);
  assert.throws(() => tacticSession(initialProofState(Nat)).exact(Zero).revert(), /No goals remain/);
});

test('revert rejects malformed dependent targets before creating a replacement', () => {
  const state = { goals: [{ context: [{ name: 'n', type: Nat }], type: variable(9) }] };
  const before = JSON.stringify(state);
  assert.throws(() => tacticSession(state), /Unbound variable/);
  assert.equal(JSON.stringify(state), before);
});
