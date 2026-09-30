import test from 'node:test';
import assert from 'node:assert/strict';
import { check, infer } from '../src/kernel/typecheck';
import { definitionalEqual } from '../src/kernel/reduction';
import { identityProof, identityType } from '../src/library/propositional';

test('polymorphic identity is kernel checked', () => {
  check([], identityProof, identityType);
  assert.ok(definitionalEqual(infer([], identityProof), identityType));
});
