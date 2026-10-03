import assert from 'node:assert/strict';
import test from 'node:test';
import { parse, ParseError } from '../src/parser/parser';

function rejectsDepth(source: string): void {
  assert.throws(() => parse(source), (error: unknown) => {
    assert.ok(error instanceof ParseError);
    assert.match(error.message, /Syntax nesting limit of 256 exceeded at position \d+$/);
    return true;
  });
}

test('deep grouping reports a parse error instead of overflowing the stack', () => {
  rejectsDepth('('.repeat(6_000) + 'Nat' + ')'.repeat(6_000));
});

test('deep constructor prefixes report a parse error instead of overflowing the stack', () => {
  rejectsDepth('Succ '.repeat(6_000) + '0');
});

test('deep binder bodies are bounded', () => {
  rejectsDepth('(x : Nat) => '.repeat(6_000) + 'x');
});

test('deep binder domains are bounded', () => {
  rejectsDepth('(x : '.repeat(6_000) + 'Nat' + ') -> Nat'.repeat(6_000));
});

test('right-associated function arrows are bounded', () => {
  rejectsDepth('Nat -> '.repeat(6_000) + 'Nat');
});

test('ordinary nested terms remain available after a rejected parse', () => {
  rejectsDepth('('.repeat(6_000) + 'Nat' + ')'.repeat(6_000));
  assert.deepEqual(parse('('.repeat(32) + 'Nat' + ')'.repeat(32)), { kind: 'Nat' });
  assert.equal(parse('(A : Type) => (x : A) => x').kind, 'Lambda');
});

test('the nesting budget is restored for separate application arguments', () => {
  const term = parse('f ' + Array.from({ length: 600 }, () => '(Nat)').join(' '));
  assert.equal(term.kind, 'App');
});

test('grouping accepts the last supported level and rejects the next one', () => {
  assert.deepEqual(parse('('.repeat(127) + 'Nat' + ')'.repeat(127)), { kind: 'Nat' });
  rejectsDepth('('.repeat(128) + 'Nat' + ')'.repeat(128));
});

test('constructor prefixes accept the last supported level and reject the next one', () => {
  assert.equal(parse('Succ '.repeat(254) + '0').kind, 'Succ');
  rejectsDepth('Succ '.repeat(255) + '0');
});
