import test from 'node:test';
import assert from 'node:assert/strict';
import { Nat, Type, Zero, app, eq, lambda, pi, variable } from '../src/syntax/ast';
import { check } from '../src/kernel/typecheck';
import { goal } from '../src/proof/state';
import { TacticError, tacticSession } from '../src/proof/tactic';

test('root admission rejects values masquerading as proposition types', () => {
  assert.throws(() => tacticSession({ goals: [{ context: [], type: Zero }] }), TacticError);
  assert.throws(() => tacticSession({ goals: [{ context: [{ name: 'h', type: Zero }], type: Zero }] }), TacticError);
});

test('root admission checks each local type before introducing that binding', () => {
  for (const type of [variable(0), variable(1), eq(Nat, Zero, Type)]) {
    assert.throws(() => tacticSession({ goals: [{ context: [{ name: 'bad', type }], type: Nat }] }), TacticError);
  }
});

test('root admission rejects ill-typed target syntax even when reduction erases it', () => {
  const target = app(lambda(Nat, Nat), Type);
  assert.throws(() => tacticSession({ goals: [{ context: [], type: target }] }), TacticError);
});

test('rejected root admission does not reserve explicit goal identities', () => {
  const before = goal([], Nat).id!;
  assert.throws(() => tacticSession({ goals: [{ id: before + 10000, context: [], type: Zero }] }), TacticError);
  assert.equal(goal([], Nat).id, before + 1);
});

test('valid dependent root contexts retain their original scope and metadata', () => {
  const context = [{ name: 'A', type: Type }, { name: 'x', type: variable(0) }];
  const target = eq(variable(1), variable(0), variable(0));
  const input = { goals: [{ id: 451, context, type: target, caseName: 'dependent' }], focusedGoalId: 451 };
  const session = tacticSession(input);
  assert.deepEqual(session.state, input);
  const result = session.rfl().proof();
  check(context.map(entry => entry.type), result, target);
});

test('root admission permits shadowed names and well-typed computed types', () => {
  const context = [{ name: 'x', type: Nat }, { name: 'x', type: app(lambda(Type, variable(0)), Nat) }];
  const session = tacticSession({ goals: [{ context, type: Nat }] }).assumption();
  check(context.map(entry => entry.type), session.proof(), Nat);
  const identity = pi(Type, pi(variable(0), variable(1)));
  check([], tacticSession({ goals: [{ context: [], type: identity }] }).intro().intro().assumption().proof(), identity);
});
