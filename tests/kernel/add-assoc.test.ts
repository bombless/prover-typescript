import test from 'node:test';
import assert from 'node:assert/strict';
import { Nat, variable, app, eq } from '../../src/syntax/ast';
import { definitionalEqual } from '../../src/kernel/reduction';
import { check, infer } from '../../src/kernel/typecheck';
import { addTerm, numeral } from '../../src/library/nat';
import { addAssocMotive, addAssocProof, addAssocType, addAssocSuccessorCase } from '../../src/library/add-assoc';

test('add_assoc proof has the expected type', () => {
  check([], addAssocProof, addAssocType);
  assert.ok(definitionalEqual(infer([], addAssocProof), addAssocType));
});

test('add_assoc successor case has the expected dependent shape', () => {
  check([], addAssocSuccessorCase, infer([], addAssocSuccessorCase));
  assert.equal(addAssocSuccessorCase.kind, 'Lambda');
  assert.equal(addAssocSuccessorCase.body.kind, 'Lambda');
  assert.equal(addAssocSuccessorCase.body.body.kind, 'Lambda');
  assert.equal(addAssocSuccessorCase.body.body.body.kind, 'Lambda');
});

test('add_assoc concrete applications are kernel-checked', () => {
  for (const [a, b, c] of [[0, 0, 0], [1, 2, 3], [2, 1, 3], [3, 2, 1]]) {
    const proof = app(app(app(addAssocProof, numeral(a)), numeral(b)), numeral(c));
    const expected = eq(
      Nat,
      addTerm(addTerm(numeral(a), numeral(b)), numeral(c)),
      addTerm(numeral(a), addTerm(numeral(b), numeral(c)))
    );
    check([], proof, expected);
    assert.ok(definitionalEqual(infer([], proof), expected));
  }
});

test('add_assoc symbolic application remains propositional', () => {
  const a = variable(2, 'a');
  const b = variable(1, 'b');
  const c = variable(0, 'c');
  const proposition = eq(Nat, addTerm(addTerm(a, b), c), addTerm(a, addTerm(b, c)));

  assert.ok(!definitionalEqual(addTerm(addTerm(a, b), c), addTerm(a, addTerm(b, c))));
  const proof = app(app(app(addAssocProof, a), b), c);
  check([Nat, Nat, Nat], proof, proposition);
});
