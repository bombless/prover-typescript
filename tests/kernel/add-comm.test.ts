import test from 'node:test';
import assert from 'node:assert/strict';
import { Nat, variable, app, eq } from '../../src/syntax/ast';
import { definitionalEqual } from '../../src/kernel/reduction';
import { check, infer } from '../../src/kernel/typecheck';
import { addTerm, numeral } from '../../src/library/nat';
import { addCommMotive, addCommProof, addCommType, addCommSuccessorCase } from '../../src/library/add-comm';

test('add_comm proof has the expected type', () => {
  check([], addCommProof, addCommType);
  assert.ok(definitionalEqual(infer([], addCommProof), addCommType));
});

test('add_comm successor case has the expected dependent shape', () => {
  check([], addCommSuccessorCase, infer([], addCommSuccessorCase));
  assert.equal(addCommSuccessorCase.kind, 'Lambda');
  assert.equal(addCommSuccessorCase.body.kind, 'Lambda');
  assert.equal(addCommSuccessorCase.body.body.kind, 'Lambda');
});

test('add_comm concrete applications are kernel-checked', () => {
  for (const [a, b] of [[0, 0], [1, 2], [2, 3], [3, 1]]) {
    const proof = app(app(addCommProof, numeral(a)), numeral(b));
    const expected = eq(Nat, addTerm(numeral(a), numeral(b)), addTerm(numeral(b), numeral(a)));
    check([], proof, expected);
    assert.ok(definitionalEqual(infer([], proof), expected));
  }
});

test('add_comm symbolic application remains propositional', () => {
  const a = variable(1, 'a');
  const b = variable(0, 'b');
  const proposition = eq(Nat, addTerm(a, b), addTerm(b, a));

  assert.ok(!definitionalEqual(addTerm(a, b), addTerm(b, a)));
  const proof = app(app(addCommProof, a), b);
  check([Nat, Nat], proof, proposition);
});
