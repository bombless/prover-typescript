import assert from 'node:assert/strict';
import test from 'node:test';
import { processLine } from '../src/repl/repl';
import { GlobalEnvironment } from '../src/environment/environment';

test('REPL line processing reaches Kernel inference', () => {
  assert.equal(processLine('0'), 'Nat');
  assert.equal(processLine('Succ 0'), 'Nat');
  assert.equal(processLine('(x : Nat) => x'), '(x : Nat) -> Nat');
});

test('REPL line processing reports an unknown variable', () => {
  assert.throws(() => processLine('unknown'), /Unknown variable: unknown/);
});

test('REPL handles exit and blank lines', () => {
  assert.equal(processLine('exit'), null);
  assert.equal(processLine('   '), '');
});

test('REPL definitions persist and can be chained', () => {
  const environment = new GlobalEnvironment();
  assert.equal(processLine('def zero := 0', environment), 'defined zero');
  assert.equal(processLine('def one := Succ zero', environment), 'defined one');
  assert.equal(processLine('one', environment), 'Nat');
});

test('REPL rejects duplicate definitions without replacing the old term', () => {
  const environment = new GlobalEnvironment();
  assert.equal(processLine('def zero := 0', environment), 'defined zero');
  assert.throws(() => processLine('def zero := Succ 0', environment), /already defined: zero/);
  assert.equal(processLine('zero', environment), 'Nat');
});

test('failed and recursive definitions do not enter the environment', () => {
  const environment = new GlobalEnvironment();
  assert.throws(() => processLine('def bad := unknown', environment), /Unknown variable: unknown/);
  assert.equal(environment.lookup('bad'), undefined);
  assert.throws(() => processLine('def loop := loop', environment), /Unknown variable: loop/);
  assert.equal(environment.lookup('loop'), undefined);
});

test('local bindings shadow global definitions', () => {
  const environment = new GlobalEnvironment();
  assert.equal(processLine('def x := 0', environment), 'defined x');
  assert.equal(processLine('(x : Nat) => x', environment), '(x : Nat) -> Nat');
});
