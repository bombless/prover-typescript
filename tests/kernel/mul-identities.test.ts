import test from 'node:test';
import assert from 'node:assert/strict';
import { Term, Nat, Type, Zero, app, eq, lambda, pi, refl, succ, variable } from '../../src/syntax/ast';
import { check } from '../../src/kernel/typecheck';
import { definitionalEqual, normalize } from '../../src/kernel/reduction';
import { numeral } from '../../src/library/nat';
import { mulTerm } from '../../src/library/mul';
import { zeroMulType, zeroMulProof, mulZeroType, mulZeroProof, oneMulType, oneMulProof, mulOneType, mulOneProof, zeroMul, mulZero, oneMul, mulOne } from '../../src/library/mul-identities';

const one = succ(Zero);
const laws = [
  { type: zeroMulType, proof: zeroMulProof, use: zeroMul, target: (n: Term) => eq(Nat, mulTerm(Zero, n), Zero) },
  { type: mulZeroType, proof: mulZeroProof, use: mulZero, target: (n: Term) => eq(Nat, mulTerm(n, Zero), Zero) },
  { type: oneMulType, proof: oneMulProof, use: oneMul, target: (n: Term) => eq(Nat, mulTerm(one, n), n) },
  { type: mulOneType, proof: mulOneProof, use: mulOne, target: (n: Term) => eq(Nat, mulTerm(n, one), n) },
];

test('multiplication identities prove independently constructed universal targets', () => {
  for (const law of laws) {
    const expected = pi(Nat, law.target(variable(0)));
    check([], law.type, Type);
    assert.ok(definitionalEqual(law.type, expected));
    check([], law.proof, expected);
    check([], law.proof, law.type);
  }
});

test('multiplication identities apply to open natural variables', () => {
  for (const law of laws) check([Nat], law.use(variable(0)), law.target(variable(0)));
  assert.throws(() => check([Nat], refl(Nat, Zero), laws[1].target(variable(0))));
  assert.throws(() => check([Nat], refl(Nat, variable(0)), laws[3].target(variable(0))));
});

test('multiplication identities preserve unrelated polymorphic and dependent locals', () => {
  const context = [Type, variable(0), Nat, eq(variable(2), variable(1), variable(1))];
  for (const law of laws) check(context, law.use(variable(1)), law.target(variable(1)));
});

test('multiplication identities remain valid beneath another binder', () => {
  for (const law of laws) {
    check([Nat], lambda(Nat, law.use(variable(1))), pi(Nat, law.target(variable(1))));
  }
});

test('multiplication identity proofs compute on small closed arguments', () => {
  for (let value = 0; value < 5; value++) {
    for (const law of laws) {
      const proof = law.use(numeral(value));
      check([], proof, law.target(numeral(value)));
      assert.equal(normalize(proof).kind, 'Refl');
    }
  }
});

test('multiplication identities reject non-natural and mismatched arguments', () => {
  for (const law of laws) {
    assert.throws(() => check([], law.use(Type), law.target(Zero)));
    assert.throws(() => check([Nat], law.use(variable(0)), eq(Nat, Zero, one)));
  }
  check([], app(mulOneProof, Zero), eq(Nat, Zero, Zero));
});
