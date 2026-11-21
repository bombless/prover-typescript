import test from 'node:test';
import assert from 'node:assert/strict';
import { Nat, variable, app, eq, refl } from '../../src/syntax/ast';
import { definitionalEqual, normalize } from '../../src/kernel/reduction';
import { check, infer } from '../../src/kernel/typecheck';
import { addTerm, numeral } from '../../src/library/nat';
import {
  addRightCongrType,
  addRightCongrProof,
  addLeftCongrType,
  addLeftCongrProof,
  perimSwapType,
  perimSwapProof,
  closedPerimeterTypes,
} from '../../src/library/geometry';

test('addRightCongr proof has the expected dependent function type', () => {
  check([], addRightCongrProof, addRightCongrType);
  assert.ok(definitionalEqual(infer([], addRightCongrProof), addRightCongrType));
});

test('addRightCongr concrete applications are Kernel-checked', () => {
  for (const [n, m, k] of [[2, 2, 3], [1, 1, 4], [0, 0, 2]] as const) {
    const a = numeral(n);
    const b = numeral(m);
    const c = numeral(k);
    const h = refl(Nat, a);
    const proof = app(app(app(app(addRightCongrProof, a), b), c), h);
    const expected = eq(Nat, addTerm(a, c), addTerm(b, c));

    check([], proof, expected);
    assert.ok(definitionalEqual(infer([], proof), expected));
  }
});

test('addLeftCongr proof has the expected dependent function type', () => {
  check([], addLeftCongrProof, addLeftCongrType);
  assert.ok(definitionalEqual(infer([], addLeftCongrProof), addLeftCongrType));
});

test('addLeftCongr concrete applications are Kernel-checked', () => {
  for (const [n, m, k] of [[2, 2, 3], [1, 1, 4], [0, 0, 2]] as const) {
    const a = numeral(n);
    const b = numeral(m);
    const c = numeral(k);
    const h = refl(Nat, a);
    const proof = app(app(app(app(addLeftCongrProof, a), b), c), h);
    const expected = eq(Nat, addTerm(c, a), addTerm(c, b));

    check([], proof, expected);
    assert.ok(definitionalEqual(infer([], proof), expected));
  }
});

test('perimSwap proof has the expected dependent function type', () => {
  check([], perimSwapProof, perimSwapType);
  assert.ok(definitionalEqual(infer([], perimSwapProof), perimSwapType));
});

test('perimSwap concrete applications are Kernel-checked', () => {
  for (const [a, b, c] of [[2, 3, 4], [1, 1, 5], [0, 2, 3]] as const) {
    const na = numeral(a);
    const nb = numeral(b);
    const nc = numeral(c);
    const proof = app(app(app(perimSwapProof, na), nb), nc);
    const expected = eq(
      Nat,
      addTerm(addTerm(na, nb), nc),
      addTerm(addTerm(nb, na), nc)
    );

    check([], proof, expected);
    assert.ok(definitionalEqual(infer([], proof), expected));
  }
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

test('perimSwap goal over free variables is propositional, not definitional', () => {
  const a = variable(2, 'a');
  const b = variable(1, 'b');
  const c = variable(0, 'c');
  const proposition = eq(
    Nat,
    addTerm(addTerm(a, b), c),
    addTerm(addTerm(b, a), c)
  );

  assert.ok(!definitionalEqual(addTerm(addTerm(a, b), c), addTerm(addTerm(b, a), c)));
  assert.ok(
    definitionalEqual(
      infer([Nat, Nat, Nat], app(app(app(perimSwapProof, a), b), c)),
      proposition
    )
  );
});
