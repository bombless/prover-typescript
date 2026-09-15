import assert from 'node:assert/strict';
import test from 'node:test';
import { parseCommand } from '../src/parser/command';

test('command parser reads definitions', () => {
  assert.deepEqual(parseCommand('def zero := 0'), {
    kind: 'def',
    name: 'zero',
    term: { kind: 'Zero' },
  });
  assert.equal(parseCommand('def one := Succ 0').kind, 'def');
});

test('command parser keeps ordinary terms as term commands', () => {
  assert.equal(parseCommand('0').kind, 'term');
  assert.equal(parseCommand('Succ 0').kind, 'term');
  assert.equal(parseCommand('(x : Nat) => x').kind, 'term');
});

test('command parser rejects malformed definitions', () => {
  assert.throws(() => parseCommand('def'), /Expected 'def name := term'/);
  assert.throws(() => parseCommand('def 123 := 0'), /Invalid definition name/);
  assert.throws(() => parseCommand('def x = 0'), /Expected 'def name := term'/);
  assert.throws(() => parseCommand('def x :='), /Expected a term after :=/);
});
