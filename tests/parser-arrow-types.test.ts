import assert from 'node:assert/strict';
import test from 'node:test';
import { parse } from '../src/parser/parser';
import { elaborate } from '../src/elaborator/elaborate';
import { check, infer } from '../src/kernel/typecheck';
import { Nat, Type, pi, variable } from '../src/syntax/ast';
import { processLine } from '../src/repl/repl';

test('nondependent arrows associate to the right', () => {
  assert.deepEqual(elaborate(parse('Nat -> Nat -> Nat')), pi(Nat, pi(Nat, Nat, '_'), '_'));
});

test('application binds tighter than arrows and parentheses override association', () => {
  assert.deepEqual(parse('F A -> B'), { kind: 'Arrow', domain: { kind: 'App', fn: { kind: 'Var', name: 'F' }, arg: { kind: 'Var', name: 'A' } }, codomain: { kind: 'Var', name: 'B' } });
  assert.deepEqual(elaborate(parse('(Nat -> Nat) -> Nat')), pi(pi(Nat, Nat, '_'), Nat, '_'));
});

test('anonymous arrows lift outer variables through each Core binder', () => {
  const term = elaborate(parse('(A : Type) -> A -> A -> A'));
  assert.deepEqual(term, pi(Type, pi(variable(0, 'A'), pi(variable(1, 'A'), variable(2, 'A'), '_'), '_'), 'A'));
  assert.deepEqual(infer([], term), Type);
});

test('anonymous arrows do not capture an outer underscore binding', () => {
  const term = elaborate(parse('(_ : Type) -> Nat -> _'));
  assert.deepEqual(term, pi(Type, pi(Nat, variable(1, '_'), '_'), '_'));
  assert.deepEqual(infer([], term), Type);
});

test('arrow codomains preserve references beneath named binders', () => {
  const term = elaborate(parse('(A : Type) -> Nat -> (x : A) -> A'));
  assert.deepEqual(infer([], term), Type);
  assert.deepEqual(term, pi(Type, pi(Nat, pi(variable(1, 'A'), variable(2, 'A'), 'x'), '_'), 'A'));
});

test('function annotations using arrows reach the kernel and REPL', () => {
  check([], elaborate(parse('(x : Nat) => x')), elaborate(parse('Nat -> Nat')));
  assert.equal(processLine('Nat -> Nat'), 'Type');
  assert.equal(processLine('theorem id : Nat -> Nat := (x : Nat) => x'), 'theorem id');
});

test('incomplete arrows and anonymous lambdas remain syntax errors', () => {
  for (const source of ['Nat ->', '-> Nat', 'Nat => Nat']) assert.throws(() => parse(source), { name: 'ParseError' });
});
