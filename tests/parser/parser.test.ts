import assert from 'node:assert/strict';
import test from 'node:test';
import { parse, ParseError } from '../../src/parser/parser';

test('parser reads Nat, Zero, and Succ', () => {
  assert.deepEqual(parse('Nat'), { kind: 'Nat' });
  assert.deepEqual(parse('0'), { kind: 'Zero' });
  assert.deepEqual(parse('Succ 0'), { kind: 'Succ', value: { kind: 'Zero' } });
});

test('parser reads variables and applications', () => {
  assert.deepEqual(parse('f x'), { kind: 'App', fn: { kind: 'Var', name: 'f' }, arg: { kind: 'Var', name: 'x' } });
});

test('parser reads Pi and lambda binders', () => {
  assert.deepEqual(parse('(x : Nat) -> Nat'), { kind: 'Pi', name: 'x', domain: { kind: 'Nat' }, body: { kind: 'Nat' } });
  assert.deepEqual(parse('(x : Nat) => x'), { kind: 'Lambda', name: 'x', domain: { kind: 'Nat' }, body: { kind: 'Var', name: 'x' } });
});

test('parser reads Eq and Refl surface constructors', () => {
  assert.deepEqual(parse('Eq Nat 0 0'), { kind: 'Eq', type: { kind: 'Nat' }, left: { kind: 'Zero' }, right: { kind: 'Zero' } });
  assert.deepEqual(parse('Refl Nat 0'), { kind: 'Refl', type: { kind: 'Nat' }, value: { kind: 'Zero' } });
});

test('parser reports malformed input', () => {
  assert.throws(() => parse('(x : Nat) =>'), ParseError);
  assert.throws(() => parse('Succ )'), ParseError);
  assert.throws(() => parse('0 0 )'), ParseError);
});
