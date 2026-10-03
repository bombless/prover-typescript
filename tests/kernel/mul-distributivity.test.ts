import test from 'node:test';
import assert from 'node:assert/strict';
import { Term, Nat, Type, Zero, eq, lambda, pi, refl, succ, variable } from '../../src/syntax/ast';
import { check } from '../../src/kernel/typecheck';
import { definitionalEqual, normalize } from '../../src/kernel/reduction';
import { addTerm, numeral } from '../../src/library/nat';
import { mulTerm } from '../../src/library/mul';
import { addMulType, addMulProof, addMul, mulAddType, mulAddProof, mulAdd } from '../../src/library/mul-distributivity';

const laws = [
  { type: addMulType, proof: addMulProof, use: addMul, target: (a: Term, b: Term, c: Term) => eq(Nat, mulTerm(addTerm(a, b), c), addTerm(mulTerm(a, c), mulTerm(b, c))) },
  { type: mulAddType, proof: mulAddProof, use: mulAdd, target: (a: Term, b: Term, c: Term) => eq(Nat, mulTerm(a, addTerm(b, c)), addTerm(mulTerm(a, b), mulTerm(a, c))) },
];

test('both distributivity theorems prove independently constructed universal targets', () => {
  for (const law of laws) {
    const expected = pi(Nat, pi(Nat, pi(Nat, law.target(variable(2), variable(1), variable(0)))));
    check([], law.type, Type);
    assert.ok(definitionalEqual(law.type, expected));
    check([], law.proof, law.type);
    check([], law.proof, expected);
  }
});

test('distributivity handles three distinct open variables where reflexivity cannot', () => {
  const a = variable(2), b = variable(1), c = variable(0);
  for (const law of laws) {
    const target = law.target(a, b, c);
    assert.equal(target.kind, 'Eq');
    if (target.kind !== 'Eq') throw new Error('Expected equality');
    check([Nat, Nat, Nat], law.use(a, b, c), target);
    assert.throws(() => check([Nat, Nat, Nat], refl(Nat, target.left), target));
  }
});

test('distributivity preserves polymorphic and dependent outer contexts', () => {
  const context = [Type, variable(0), Nat, Nat, Nat, eq(variable(4), variable(3), variable(3))];
  for (const law of laws) {
    check(context, law.use(variable(3), variable(2), variable(1)), law.target(variable(3), variable(2), variable(1)));
  }
});

test('distributivity applications remain scoped under a new binder', () => {
  for (const law of laws) {
    check([Nat, Nat], lambda(Nat, law.use(variable(2), variable(1), variable(0))),
      pi(Nat, law.target(variable(2), variable(1), variable(0))));
  }
});

test('distributivity computes at zero, one, and a nontrivial successor case', () => {
  for (const [a, b, c] of [[0, 2, 3], [1, 1, 2], [2, 1, 2]]) {
    for (const law of laws) {
      const proof = law.use(numeral(a), numeral(b), numeral(c));
      check([], proof, law.target(numeral(a), numeral(b), numeral(c)));
      assert.equal(normalize(proof).kind, 'Refl');
    }
  }
});

test('distributivity rejects wrong argument types and unrelated conclusions', () => {
  for (const law of laws) {
    for (const args of [[Type, Zero, Zero], [Zero, Type, Zero], [Zero, Zero, Type]]) {
      assert.throws(() => check([], law.use(...args as [Term, Term, Term]), eq(Nat, Zero, Zero)));
    }
    assert.throws(() => check([Nat, Nat, Nat], law.use(variable(2), variable(1), variable(0)), eq(Nat, Zero, succ(Zero))));
  }
});
