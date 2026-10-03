import assert from 'node:assert/strict';
import test from 'node:test';
import { GlobalEnvironment, EnvironmentError, type Environment } from '../src/environment/environment';
import { parseCommand } from '../src/parser/command';
import { ParseError } from '../src/parser/parser';
import { processLine } from '../src/repl/repl';

test('reset is an exact command without arguments', () => {
  assert.deepEqual(parseCommand('  #reset\t'), { kind: 'reset' });
  for (const source of ['#reset now', '#resets', '#reset()']) {
    assert.throws(() => parseCommand(source), ParseError);
  }
});

test('reset removes definitions and theorem proofs and permits reusing their names', () => {
  const environment = new GlobalEnvironment();
  processLine('def n := 0', environment);
  processLine('theorem self : Eq Nat 0 0 := Refl Nat 0', environment);
  assert.equal(processLine('#reset', environment), 'Session definitions cleared.');
  assert.equal(environment.lookup('n'), undefined);
  assert.equal(environment.lookup('self'), undefined);
  assert.equal(processLine('def n := 1', environment), 'defined n');
});

test('reset affects only the supplied environment', () => {
  const first = new GlobalEnvironment();
  const second = new GlobalEnvironment();
  processLine('def n := 0', first);
  processLine('def n := 1', second);
  const other = second.lookup('n');
  processLine('#reset', first);
  assert.equal(second.lookup('n'), other);
  assert.equal(processLine('n', second), 'Nat');
});

test('resetting an empty environment is repeatable and leaves built-ins available', () => {
  const environment = new GlobalEnvironment();
  assert.equal(processLine('#reset', environment), 'Session definitions cleared.');
  assert.equal(processLine('#reset', environment), 'Session definitions cleared.');
  assert.equal(processLine('Succ 0', environment), 'Nat');
  assert.equal(processLine('Nat', environment), 'Type');
});

test('custom environments without reset support remain compatible', () => {
  const environment: Environment = { lookup: () => undefined, define: () => {} };
  assert.equal(processLine('0', environment), 'Nat');
  assert.throws(() => processLine('#reset', environment), (error: unknown) => {
    assert.ok(error instanceof EnvironmentError);
    assert.match(error.message, /does not support clearing/);
    return true;
  });
});

test('failed custom clears propagate instead of reporting success', () => {
  class RejectingEnvironment extends GlobalEnvironment {
    clear(): void { throw new Error('read-only session'); }
  }
  const environment = new RejectingEnvironment();
  processLine('def n := 0', environment);
  const original = environment.lookup('n');
  assert.throws(() => processLine('#reset', environment), /read-only session/);
  assert.equal(environment.lookup('n'), original);
});

test('reset remains usable as a normal declaration name', () => {
  const environment = new GlobalEnvironment();
  processLine('def reset := 0', environment);
  assert.equal(processLine('reset', environment), 'Nat');
  processLine('#reset', environment);
  assert.equal(environment.lookup('reset'), undefined);
});
