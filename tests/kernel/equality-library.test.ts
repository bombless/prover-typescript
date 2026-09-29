import assert from 'node:assert/strict';
import test from 'node:test';
import { check } from '../../src/kernel/typecheck';
import { definitionalEqual } from '../../src/kernel/reduction';
import {
  equalitySymmetry, equalitySymmetryProof, equalitySymmetryType,
  equalityTransitivity, equalityTransitivityProof, equalityTransitivityType,
  equalityCongruence, equalityCongruenceProof, equalityCongruenceType,
} from '../../src/library/equality';
import { Nat, Type, Zero, app, eq, lambda, pi, refl, succ, variable } from '../../src/syntax/ast';

test('generic equality theorems check against their complete polymorphic types', () => {
  check([], equalitySymmetryProof, equalitySymmetryType);
  check([], equalityTransitivityProof, equalityTransitivityType);
  check([], equalityCongruenceProof, equalityCongruenceType);
});

test('symmetry reverses a local equality with distinct endpoints', () => {
  const context = [Nat, Nat, eq(Nat, variable(1), variable(0))];
  check(context, equalitySymmetry(Nat, variable(2), variable(1), variable(0)),
    eq(Nat, variable(1), variable(2)));
});

test('transitivity composes two different local equality witnesses', () => {
  const context = [Nat, Nat, Nat, eq(Nat, variable(2), variable(1)), eq(Nat, variable(2), variable(1))];
  check(context, equalityTransitivity(Nat, variable(4), variable(3), variable(2), variable(1), variable(0)),
    eq(Nat, variable(4), variable(2)));
});

test('congruence transports equality through an arbitrary local function', () => {
  const context = [pi(Nat, Nat), Nat, Nat, eq(Nat, variable(1), variable(0))];
  check(context, equalityCongruence(Nat, Nat, variable(3), variable(2), variable(1), variable(0)),
    eq(Nat, app(variable(3), variable(2)), app(variable(3), variable(1))));
});

test('congruence supports a codomain different from the domain', () => {
  const fn = lambda(Nat, Nat);
  check([], equalityCongruence(Nat, Type, fn, Zero, Zero, refl(Nat, Zero)), eq(Type, Nat, Nat));
});

test('generic applications preserve the scope of local types', () => {
  const context = [Type, variable(0), variable(1), eq(variable(2), variable(1), variable(0))];
  check(context, equalitySymmetry(variable(3), variable(2), variable(1), variable(0)),
    eq(variable(3), variable(1), variable(2)));
});

test('equality combinators compute to reflexivity for reflexive evidence', () => {
  const evidence = refl(Nat, Zero);
  assert.ok(definitionalEqual(equalitySymmetry(Nat, Zero, Zero, evidence), evidence));
  assert.ok(definitionalEqual(equalityTransitivity(Nat, Zero, Zero, Zero, evidence, evidence), evidence));
  assert.ok(definitionalEqual(equalityCongruence(Nat, Nat, lambda(Nat, succ(variable(0))), Zero, Zero, evidence), refl(Nat, succ(Zero))));
});

test('invalid endpoints and evidence remain rejected by the Kernel', () => {
  assert.throws(() => check([], equalitySymmetry(Nat, Zero, succ(Zero), refl(Nat, Zero)), eq(Nat, succ(Zero), Zero)), /Type mismatch/);
  assert.throws(() => check([], equalityTransitivity(Nat, Zero, succ(Zero), Zero, refl(Nat, Zero), refl(Nat, Zero)), eq(Nat, Zero, Zero)), /Type mismatch/);
  assert.throws(() => check([], equalityCongruence(Nat, Nat, Zero, Zero, Zero, refl(Nat, Zero)), eq(Nat, Zero, Zero)), /Type mismatch/);
});
