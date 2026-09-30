import test from 'node:test';
import assert from 'node:assert/strict';
import { check, infer } from '../src/kernel/typecheck';
import { definitionalEqual } from '../src/kernel/reduction';
import { absurdProof, absurdType } from '../src/library/propositional';
import { Empty, Type, pi, lambda, variable, emptyRec } from '../src/syntax/ast';

test('empty eliminator and contradiction principle are kernel checked', () => {
  check([], absurdProof, absurdType);
  assert.ok(definitionalEqual(infer([], absurdProof), absurdType));
  const target = lambda(Empty, Type);
  const eliminator = emptyRec(target, variable(0));
  check([Empty], eliminator, Type);
});
