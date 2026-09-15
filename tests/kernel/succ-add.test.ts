import test from 'node:test';
import assert from 'node:assert/strict';
import { Nat, variable, app, succ, eq } from '../../src/syntax/ast';
import { definitionalEqual } from '../../src/kernel/reduction';
import { check, infer } from '../../src/kernel/typecheck';
import { addTerm, numeral } from '../../src/library/nat';
import { succAddMotive, succAddProof, succAddType } from '../../src/library/succ-add';

test('succ_add proof has the expected type', () => {
  check([], succAddProof, succAddType);
  assert.ok(definitionalEqual(infer([], succAddProof), succAddType));
});

test('succ_add is definitionally reflexive', () => {
  const n = variable(1, 'n');
  const m = variable(0, 'm');
  const expected = app(app(succAddMotive, n), m);
  const proof = app(app(succAddProof, n), m);

  check([Nat, Nat], proof, expected);
  assert.ok(definitionalEqual(infer([Nat, Nat], proof), expected));
  assert.ok(definitionalEqual(addTerm(succ(n), m), succ(addTerm(n, m))));
});

test('succ_add concrete applications are kernel-checked', () => {
  for (const [n, m] of [[0, 0], [1, 2], [2, 3], [3, 1]]) {
    const proof = app(app(succAddProof, numeral(n)), numeral(m));
    const expected = eq(Nat, addTerm(succ(numeral(n)), numeral(m)), succ(addTerm(numeral(n), numeral(m))));
    check([], proof, expected);
    assert.ok(definitionalEqual(infer([], proof), expected));
  }
});
