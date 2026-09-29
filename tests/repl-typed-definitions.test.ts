import assert from 'node:assert/strict';
import test from 'node:test';
import { parseCommand } from '../src/parser/command';
import { processLine } from '../src/repl/repl';
import { GlobalEnvironment } from '../src/environment/environment';

test('definition annotations are parsed without changing ordinary definitions', () => {
  assert.deepEqual(parseCommand('def zero : Nat := 0'), { kind: 'def', name: 'zero', annotation: { kind: 'Nat' }, term: { kind: 'Zero' } });
  assert.deepEqual(parseCommand('def zero := 0'), { kind: 'def', name: 'zero', term: { kind: 'Zero' } });
});

test('annotated definitions persist after their values check', () => {
  const environment = new GlobalEnvironment();
  assert.equal(processLine('def zero : Nat := 0', environment), 'defined zero');
  assert.equal(processLine('zero', environment), 'Nat');
  assert.equal(processLine('def id : (A : Type) -> (x : A) -> A := (A : Type) => (x : A) => x', environment), 'defined id');
  assert.equal(processLine('id Nat zero', environment), 'Nat');
});

test('annotations can reference existing definitions and reduce definitionally', () => {
  const environment = new GlobalEnvironment();
  processLine('def N := Nat', environment);
  assert.equal(processLine('def one : ((T : Type) => T) N := Succ 0', environment), 'defined one');
});

test('ill-typed values and non-type annotations never enter the environment', () => {
  const environment = new GlobalEnvironment();
  for (const source of ['def bad : Nat := Type', 'def bad : 0 := 0', 'def bad : missing := 0', 'def bad : Nat := missing']) {
    assert.throws(() => processLine(source, environment));
    assert.equal(environment.lookup('bad'), undefined);
  }
});

test('a failed annotated redefinition preserves the original value', () => {
  const environment = new GlobalEnvironment();
  processLine('def zero := 0', environment);
  const original = environment.lookup('zero');
  assert.throws(() => processLine('def zero : Nat := Succ 0', environment), /already defined/);
  assert.equal(environment.lookup('zero'), original);
});

test('missing annotation or value produces a parse error', () => {
  assert.throws(() => parseCommand('def zero : := 0'), /Expected a type after :/);
  assert.throws(() => parseCommand('def zero : Nat :='), /Expected a term after :=/);
});
