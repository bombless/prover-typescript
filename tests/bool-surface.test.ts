import test from 'node:test';
import assert from 'node:assert/strict';
import { parse } from '../src/parser/parser';
import { elaborate } from '../src/elaborator/elaborate';
import { infer, show } from '../src/kernel/typecheck';

test('surface syntax exposes Bool and its constructors', () => {
  assert.equal(show(infer([], elaborate(parse('Bool')))), 'Type');
  assert.equal(show(infer([], elaborate(parse('True')))), 'Bool');
  assert.equal(show(infer([], elaborate(parse('False')))), 'Bool');
});
