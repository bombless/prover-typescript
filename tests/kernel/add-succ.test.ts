import test from 'node:test';
import assert from 'node:assert/strict';
import { Nat, variable, pi, app, succ, eq } from '../../src/syntax/ast';
import { definitionalEqual } from '../../src/kernel/reduction';
import { check, infer } from '../../src/kernel/typecheck';
import { addTerm, numeral } from '../../src/library/nat';
import { addSuccMotive, addSuccProof, addSuccType, addSuccSuccessorCase } from '../../src/library/add-succ';

test('add_succ proof has the expected type', () => {
  check([], addSuccProof, addSuccType);
  assert.ok(definitionalEqual(infer([], addSuccProof), addSuccType));
});

test('add_succ uses Nat.rec and Eq.rec in the successor case', () => {
  const expectedSuccessorCaseType = pi(
    Nat,
    pi(
      app(addSuccMotive, variable(0)),
      app(addSuccMotive, succ(variable(1)))
    )
  );

  check([], addSuccSuccessorCase, expectedSuccessorCaseType);
  assert.equal(addSuccSuccessorCase.kind, 'Lambda');
  assert.equal(addSuccSuccessorCase.body.kind, 'Lambda');
  assert.equal(addSuccSuccessorCase.body.body.kind, 'Lambda');

  const containsEqRec = (term: import('../../src/syntax/ast').Term): boolean => {
    if (term.kind === 'EqRec') return true;
    switch (term.kind) {
      case 'Type': case 'Nat': case 'Zero': case 'Var': return false;
      case 'Pi': case 'Lambda': return containsEqRec(term.domain) || containsEqRec(term.body);
      case 'App': return containsEqRec(term.fn) || containsEqRec(term.arg);
      case 'Succ': return containsEqRec(term.value);
      case 'NatRec': return containsEqRec(term.motive) || containsEqRec(term.zeroCase) || containsEqRec(term.succCase) || containsEqRec(term.scrutinee);
      case 'Eq': return containsEqRec(term.type) || containsEqRec(term.left) || containsEqRec(term.right);
      case 'Refl': return containsEqRec(term.type) || containsEqRec(term.value);
    }
  };

  assert.ok(containsEqRec(addSuccSuccessorCase));
});

test('add_succ unknown-variable application is propositional, not definitional', () => {
  const n = variable(0, 'n');
  const m = variable(1, 'm');
  const proposition = eq(Nat, addTerm(n, succ(m)), succ(addTerm(n, m)));

  assert.ok(!definitionalEqual(addTerm(n, succ(m)), succ(addTerm(n, m))));
  const proof = app(app(addSuccProof, n), m);
  check([Nat, Nat], proof, proposition);
  assert.ok(definitionalEqual(infer([Nat, Nat], proof), proposition));
});

test('add_succ concrete applications are kernel-checked', () => {
  for (const [n, m] of [[0, 0], [1, 2], [2, 3], [3, 1]]) {
    const proof = app(app(addSuccProof, numeral(n)), numeral(m));
    const expected = eq(Nat, addTerm(numeral(n), succ(numeral(m))), succ(addTerm(numeral(n), numeral(m))));
    check([], proof, expected);
    assert.ok(definitionalEqual(infer([], proof), expected));
  }
});
