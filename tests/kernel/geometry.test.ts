import test from 'node:test';
import assert from 'node:assert/strict';
import { Nat, Point, variable, app, eq, refl, pi } from '../../src/syntax/ast';
import { definitionalEqual, normalize } from '../../src/kernel/reduction';
import { check, infer } from '../../src/kernel/typecheck';
import { addTerm, numeral } from '../../src/library/nat';
import {
  symmNatType,
  symmNatProof,
  transNatType,
  transNatProof,
  segReflType,
  segReflProof,
  segSymType,
  segSymProof,
  segTransType,
  segTransProof,
  isoSidesType,
  isoSidesProof,
  betweenType,
  betweenProof,
  sssTwoEdgesType,
  sssTwoEdgesProof,
  closedPerimeterTypes,
} from '../../src/library/geometry';

test('symmNat proof has the expected type and works on concrete lengths', () => {
  check([], symmNatProof, symmNatType);
  assert.ok(definitionalEqual(infer([], symmNatProof), symmNatType));

  const x = numeral(2);
  const y = numeral(2);
  const proof = app(app(app(symmNatProof, x), y), refl(Nat, x));
  const expected = eq(Nat, y, x);
  check([], proof, expected);
  assert.ok(definitionalEqual(infer([], proof), expected));
});

test('transNat proof has the expected type and works on concrete lengths', () => {
  check([], transNatProof, transNatType);
  assert.ok(definitionalEqual(infer([], transNatProof), transNatType));

  const x = numeral(2);
  const y = numeral(2);
  const z = numeral(2);
  const proof = app(app(app(app(app(transNatProof, x), y), z), refl(Nat, x)), refl(Nat, y));
  const expected = eq(Nat, x, z);
  check([], proof, expected);
  assert.ok(definitionalEqual(infer([], proof), expected));
});

test('every point-level geometry lemma checks against its proposition type', () => {
  const lemmas = [
    [segReflProof, segReflType],
    [segSymProof, segSymType],
    [segTransProof, segTransType],
    [isoSidesProof, isoSidesType],
    [betweenProof, betweenType],
    [sssTwoEdgesProof, sssTwoEdgesType],
  ] as const;

  for (const [proof, type] of lemmas) {
    check([], proof, type);
    assert.ok(definitionalEqual(infer([], proof), type));
  }
});

test('point-level lemmas keep Point binders in their inferred type', () => {
  for (const type of [segReflType, segSymType, segTransType, isoSidesType, betweenType, sssTwoEdgesType]) {
    check([], type, { kind: 'Type' });
  }
});

test('point variables used under a distance function stay well typed', () => {
  // Context (oldest → newest): dist : Point → Point → Nat, A : Point, B : Point.
  const distType = pi(Point, pi(Point, Nat, 'q'), 'p');
  const ctx = [distType, Point, Point];
  const dist = variable(2, 'dist');
  const a = variable(1, 'A');
  const b = variable(0, 'B');
  const dAB = app(app(dist, a), b);
  check(ctx, dAB, Nat);
});

test('every closed perimeter proposition reduces to a reflexive equality', () => {
  for (const proposition of closedPerimeterTypes) {
    assert.equal(proposition.kind, 'Eq');
    if (proposition.kind !== 'Eq') continue;
    check([], proposition, { kind: 'Type' });
    assert.ok(
      definitionalEqual(normalize(proposition.left), normalize(proposition.right)),
      `expected ${normalize(proposition.left)} = ${normalize(proposition.right)}`
    );
  }
});

test('free-variable perimeter goals remain propositional, not definitional', () => {
  const a = variable(2, 'a');
  const b = variable(1, 'b');
  const c = variable(0, 'c');
  const proposition = eq(Nat, addTerm(addTerm(a, b), c), addTerm(addTerm(b, a), c));
  assert.ok(!definitionalEqual(addTerm(addTerm(a, b), c), addTerm(addTerm(b, a), c)));
  check([Nat, Nat, Nat], proposition, { kind: 'Type' });
});
