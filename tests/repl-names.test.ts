import assert from 'node:assert/strict';
import test from 'node:test';
import { GlobalEnvironment } from '../src/environment/environment';
import { parseCommand } from '../src/parser/command';
import { processLine } from '../src/repl/repl';
import { Zero } from '../src/syntax/ast';

test('#names lists only stored declarations in insertion order', () => {
  const environment = new GlobalEnvironment();
  assert.equal(processLine('#names', environment), 'No definitions.');
  processLine('def second := 0', environment);
  processLine('theorem first : Eq Nat 0 0 := Refl Nat 0', environment);
  assert.equal(processLine('#names', environment), 'second\nfirst');
});

test('name snapshots cannot mutate the stored declaration order', () => {
  const environment = new GlobalEnvironment();
  environment.define('first', Zero);
  const names = environment.names() as string[];
  names.push('invented'); names.reverse();
  assert.deepEqual(environment.names(), ['first']);
  assert.equal(environment.lookup('invented'), undefined);
});

test('prototype-like names are listed only after explicit definition', () => {
  const environment = new GlobalEnvironment();
  assert.deepEqual(environment.names(), []);
  for (const name of ['__proto__', 'constructor', 'toString']) environment.define(name, Zero);
  assert.equal(processLine('#names', environment), '__proto__\nconstructor\ntoString');
});

test('failed and duplicate definitions do not add list entries', () => {
  const environment = new GlobalEnvironment();
  processLine('def zero := 0', environment);
  assert.throws(() => processLine('def bad := unknown', environment));
  assert.throws(() => processLine('def zero := Succ 0', environment));
  assert.equal(processLine('#names', environment), 'zero');
});

test('#names takes no arguments and does not match longer command names', () => {
  assert.deepEqual(parseCommand(' #names '), { kind: 'names' });
  for (const source of ['#names zero', '#namesExtra']) assert.throws(() => parseCommand(source), { name: 'ParseError' });
});

test('custom lookup-only environments retain ordinary REPL support', () => {
  const environment = { lookup: () => undefined, define: () => {} };
  assert.equal(processLine('0', environment), 'Nat');
  assert.throws(() => processLine('#names', environment), /does not support listing/);
});
