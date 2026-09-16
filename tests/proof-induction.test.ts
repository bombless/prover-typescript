import test from 'node:test';
import assert from 'node:assert/strict';
import { infer, show } from '../src/kernel/typecheck';
import { definitionalEqual } from '../src/kernel/reduction';
import { Nat, Type, Zero, eq, pi, variable } from '../src/syntax/ast';
import { addZeroType } from '../src/library/add-zero';
import { proofState } from '../src/proof/state';
import { TacticError, tacticSession } from '../src/proof/tactic';

const identityType = pi(Nat, eq(Nat, variable(0, 'n'), variable(0, 'n')), 'n');

function identitySession() {
  return tacticSession(proofState([{ context: [], type: identityType }]));
}

test('induction creates real base and successor goals with case metadata', () => {
  const session = identitySession().intro().induction('n');
  assert.equal(session.state.goals.length, 2);
  assert.equal(session.state.goals[0].caseName, 'base');
  assert.equal(session.state.goals[1].caseName, 'successor');
  assert.equal(show(session.state.goals[0].type), 'Eq Nat 0 0');
  assert.equal(session.state.goals[0].context.length, 0);
  assert.equal(session.state.goals[1].context.length, 2);
  assert.equal(session.state.goals[1].context[0].name, 'n');
  assert.equal(show(session.state.goals[1].context[0].type), 'Nat');
  assert.equal(session.state.goals[1].context[1].name, 'IH');
  assert.equal(show(session.state.goals[1].context[1].type), 'Eq Nat n n');
  assert.equal(show(session.state.goals[1].type), 'Eq Nat (Succ n) (Succ n)');
});

test('induction base and successor goals solve through existing focused-goal workflow', () => {
  const session = identitySession().intro().induction('n');
  const afterBase = session.rfl();
  assert.equal(afterBase.state.goals.length, 1);
  assert.equal(afterBase.state.goals[0].caseName, 'successor');
  const complete = afterBase.rfl();
  assert.equal(complete.state.goals.length, 0);
  const proof = complete.proof();
  assert.equal(proof.kind, 'Lambda');
  assert.equal(proof.body.kind, 'NatRec');
  assert.equal(infer([], proof).kind, 'Pi');
});

test('induction hypothesis is a real context entry and can be consumed by rewrite', () => {
  const session = tacticSession(proofState([{ context: [], type: addZeroType }]));
  const afterIntro = session.intro();
  const afterInduction = afterIntro.induction('n');
  assert.equal(afterInduction.state.goals[1].context[1].name, 'IH');
  const afterBase = afterInduction.rfl();
  const afterRewrite = afterBase.rewrite(variable(0, 'IH'));
  const complete = afterRewrite.rfl();
  assert.equal(complete.state.goals.length, 0);
  const proof = complete.proof();
  assert.equal(proof.kind, 'Lambda');
  assert.equal(proof.body.kind, 'NatRec');
  assert.ok(definitionalEqual(infer([], proof), addZeroType));
});

test('induction rejects a non-Nat variable without changing the proof state', () => {
  const state = proofState([{ context: [{ name: 'x', type: Type }], type: Type }]);
  const session = tacticSession(state);
  assert.throws(() => session.induction('x'), (error: unknown) => error instanceof TacticError && /requires a Nat variable/.test(error.message));
  assert.deepEqual(session.state, state);
});

test('induction rejects a missing variable without changing the proof state', () => {
  const session = identitySession().intro();
  const before = session.state;
  assert.throws(() => session.induction('missing'), (error: unknown) => error instanceof TacticError && /variable not found/.test(error.message));
  assert.deepEqual(session.state, before);
});

test('failed induction target validation leaves state unchanged', () => {
  const state = proofState([{ context: [{ name: 'n', type: Nat }], type: variable(1) }]);
  const session = tacticSession(state);
  assert.throws(() => session.induction('n'), (error: unknown) => error instanceof TacticError && /Unbound variable/.test(error.message));
  assert.deepEqual(session.state, state);
});
