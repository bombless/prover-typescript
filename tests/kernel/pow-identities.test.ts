import test from 'node:test';
import assert from 'node:assert/strict';
import { Term, Nat, Type, Zero, eq, lambda, pi, refl, succ, variable } from '../../src/syntax/ast';
import { check } from '../../src/kernel/typecheck';
import { definitionalEqual, normalize } from '../../src/kernel/reduction';
import { numeral } from '../../src/library/nat';
import { mulTerm } from '../../src/library/mul';
import { powTerm } from '../../src/library/pow';
import { powZeroType, powZeroProof, powZero, powOneType, powOneProof, powOne, onePowType, onePowProof, onePow, zeroPowSuccType, zeroPowSuccProof, zeroPowSucc, powSuccType, powSuccProof, powSucc } from '../../src/library/pow-identities';

const one = succ(Zero);
const laws = [
  { type: powZeroType, proof: powZeroProof, use: powZero, target: (n: Term) => eq(Nat, powTerm(n, Zero), one) },
  { type: powOneType, proof: powOneProof, use: powOne, target: (n: Term) => eq(Nat, powTerm(n, one), n) },
  { type: onePowType, proof: onePowProof, use: onePow, target: (n: Term) => eq(Nat, powTerm(one, n), one) },
  { type: zeroPowSuccType, proof: zeroPowSuccProof, use: zeroPowSucc, target: (n: Term) => eq(Nat, powTerm(Zero, succ(n)), Zero) },
];
const recurrence = (n: Term, k: Term): Term => eq(Nat, powTerm(n, succ(k)), mulTerm(n, powTerm(n, k)));

test('power laws prove independently constructed universal targets', () => {
  for (const law of laws) {
    const expected = pi(Nat, law.target(variable(0)));
    check([], law.type, Type);
    assert.ok(definitionalEqual(law.type, expected));
    check([], law.proof, expected);
    check([], law.proof, law.type);
  }
  const expected = pi(Nat, pi(Nat, recurrence(variable(1), variable(0))));
  assert.ok(definitionalEqual(powSuccType, expected));
  check([], powSuccProof, expected);
  check([], powSuccProof, powSuccType);
});

test('power laws apply to open natural variables, including non-reflexive unit laws', () => {
  for (const law of laws) check([Nat], law.use(variable(0)), law.target(variable(0)));
  check([Nat, Nat], powSucc(variable(1), variable(0)), recurrence(variable(1), variable(0)));
  assert.throws(() => check([Nat], refl(Nat, one), laws[2].target(variable(0))));
  assert.throws(() => check([Nat], refl(Nat, variable(0)), laws[1].target(variable(0))));
});

test('power laws preserve dependent and polymorphic outer contexts', () => {
  const context = [Type, variable(0), Nat, Nat, eq(variable(3), variable(2), variable(2))];
  for (const law of laws) check(context, law.use(variable(1)), law.target(variable(1)));
  check(context, powSucc(variable(2), variable(1)), recurrence(variable(2), variable(1)));
});

test('power proof applications remain scoped beneath a binder', () => {
  for (const law of laws) check([Nat], lambda(Nat, law.use(variable(1))), pi(Nat, law.target(variable(1))));
  check([Nat], lambda(Nat, powSucc(variable(1), variable(0))), pi(Nat, recurrence(variable(1), variable(0))));
});

test('power laws compute on small natural inputs', () => {
  for (let n = 0; n < 4; n++) {
    for (const law of laws) {
      const proof = law.use(numeral(n));
      check([], proof, law.target(numeral(n)));
      assert.equal(normalize(proof).kind, 'Refl');
    }
    const proof = powSucc(numeral(n), numeral(2));
    check([], proof, recurrence(numeral(n), numeral(2)));
    assert.equal(normalize(proof).kind, 'Refl');
  }
});

test('zero power distinguishes zero from positive exponents', () => {
  check([], powZero(Zero), eq(Nat, powTerm(Zero, Zero), one));
  check([Nat], zeroPowSucc(variable(0)), eq(Nat, powTerm(Zero, succ(variable(0))), Zero));
  assert.throws(() => check([], zeroPowSucc(Zero), eq(Nat, powTerm(Zero, Zero), Zero)));
  assert.throws(() => check([], powZero(Zero), eq(Nat, powTerm(Zero, Zero), Zero)));
});

test('power laws reject wrong argument types and false conclusions', () => {
  for (const law of laws) {
    assert.throws(() => check([], law.use(Type), eq(Nat, Zero, Zero)));
    assert.throws(() => check([Nat], law.use(variable(0)), eq(Nat, Zero, one)));
  }
  assert.throws(() => check([], powSucc(Type, Zero), eq(Nat, Zero, Zero)));
  assert.throws(() => check([], powSucc(Zero, Type), eq(Nat, Zero, Zero)));
});
