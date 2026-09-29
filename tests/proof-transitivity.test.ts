import assert from 'node:assert/strict';
import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { tacticSession } from '../src/proof/tactic';
import { initialProofState } from '../src/proof/state';
import { Nat, Type, Zero, eq, pi, succ, variable } from '../src/syntax/ast';

test('transitivity generates two ordered equality goals and a checked proof', () => {
  const target = eq(Nat, Zero, Zero);
  const original = tacticSession({ goals: [{ context: [], type: target, caseName: 'base' }] });
  const split = original.transitivity(Zero);
  assert.equal(split.state.goals.length, 2);
  assert.notEqual(split.state.goals[0].id, split.state.goals[1].id);
  assert.ok(split.state.goals.every(item => item.caseName === 'base'));
  assert.equal(original.state.goals.length, 1);
  check([], split.rfl().rfl().proof(), target);
});

test('transitivity composes local equality hypotheses with distinct endpoints', () => {
  const context = [
    { name: 'a', type: Nat }, { name: 'b', type: Nat }, { name: 'c', type: Nat },
    { name: 'ab', type: eq(Nat, variable(2), variable(1)) },
    { name: 'bc', type: eq(Nat, variable(2), variable(1)) },
  ];
  const target = eq(Nat, variable(4), variable(2));
  const split = tacticSession({ goals: [{ context, type: target }] }).transitivity(variable(3));
  assert.deepEqual(split.state.goals[0].type, eq(Nat, variable(4), variable(3)));
  assert.deepEqual(split.state.goals[1].type, eq(Nat, variable(3), variable(2)));
  const proof = split.assumption().assumption().proof();
  check(context.map(item => item.type), proof, target);
});

test('transitivity works under polymorphic dependent binders', () => {
  const target = pi(Type, pi(variable(0), eq(variable(1), variable(0), variable(0)), 'x'), 'A');
  const session = tacticSession(initialProofState(target)).intro().intro().transitivity(variable(0));
  check([], session.rfl().rfl().proof(), target);
});

test('transitivity permits solving the second branch before the first', () => {
  const target = eq(Nat, Zero, Zero);
  const split = tacticSession(initialProofState(target)).transitivity(Zero);
  const proof = split.focusGoal(split.state.goals[1].id!).rfl().rfl().proof();
  check([], proof, target);
});

test('nested transitivity keeps siblings and composes all three proofs', () => {
  const target = eq(Nat, Zero, Zero);
  const split = tacticSession(initialProofState(target)).transitivity(Zero);
  const nested = split.transitivity(Zero);
  assert.equal(nested.state.goals.length, 3);
  assert.deepEqual(nested.state.goals[2], split.state.goals[1]);
  check([], nested.rfl().rfl().rfl().proof(), target);
});

test('transitivity validates the middle term without mutating the session', () => {
  const target = eq(Nat, Zero, Zero);
  const original = tacticSession(initialProofState(target));
  const before = original.state;
  assert.throws(() => original.transitivity(Type), /Type mismatch/);
  assert.throws(() => original.transitivity(variable(0)), /Unbound variable/);
  assert.equal(original.state, before);
  assert.throws(() => tacticSession(initialProofState(Nat)).transitivity(Zero), /equality goal/);
  assert.throws(() => original.rfl().transitivity(Zero), /No goals remain/);
});

test('a nontrivial intermediate point does not manufacture a proof', () => {
  const split = tacticSession(initialProofState(eq(Nat, Zero, Zero))).transitivity(succ(Zero));
  assert.throws(() => split.rfl(), /definitionally equal/);
  assert.throws(() => split.proof(), /goal\(s\) remain/);
});
