import assert from 'node:assert/strict';
import test from 'node:test';
import { GlobalEnvironment } from '../src/environment/environment';
import { parseCommand } from '../src/parser/command';
import { ParseError, parse } from '../src/parser/parser';
import { processLine } from '../src/repl/repl';

test('terms accept inline, nested, and multiline block comments', () => {
  assert.deepEqual(parse('Succ /- one /- nested -/ -/ 0'), parse('Succ 0'));
  assert.deepEqual(parse('(x : /- domain\r\ncomment -/ Nat) => x'), parse('(x : Nat) => x'));
});

test('block comments separate adjacent tokens instead of joining them', () => {
  assert.deepEqual(parse('f/- gap -/x'), parse('f x'));
  assert.deepEqual(parse('Su/- gap -/cc'), parse('Su cc'));
});

test('line and block comment delimiters respect the surrounding comment', () => {
  assert.deepEqual(parse('Nat -- /- not a block\n'), parse('Nat'));
  assert.deepEqual(parse('Nat /- -- does not hide the closing delimiter -/'), parse('Nat'));
});

test('block comments cannot add command separators or declaration syntax', () => {
  const source = 'theorem self : Eq Nat 0 0 /- := fake -/ := Refl Nat 0';
  assert.deepEqual(parseCommand(source), parseCommand('theorem self : Eq Nat 0 0 := Refl Nat 0'));
  assert.throws(() => parseCommand('def one /- := 1 -/'), ParseError);
});

test('REPL comments can surround declarations, references, empty input, and exit', () => {
  const environment = new GlobalEnvironment();
  assert.equal(processLine('/- first -/ def one := 1 /- last -/', environment), 'defined one');
  assert.equal(processLine('one /- use -/', environment), 'Nat');
  assert.equal(processLine('/- only /- nested -/ comment -/'), '');
  assert.equal(processLine('exit /- done -/'), null);
});

test('unexpected tokens retain original offsets through comments', () => {
  const source = 'Nat /- multiline\ncomment 😀 -/ @';
  assert.throws(() => parse(source), new RegExp(`position ${source.indexOf('@')}$`));
});

test('unterminated block comments report their outer opening position', () => {
  for (const source of ['Nat /- unfinished', 'Nat /- outer /- inner -/', 'Nat /- outer /- inner']) {
    assert.throws(() => parse(source), (error: unknown) => {
      assert.ok(error instanceof ParseError);
      assert.equal(error.message, 'Unterminated block comment at position 4');
      return true;
    });
  }
});

test('an incomplete trailing comment prevents storing a declaration', () => {
  const environment = new GlobalEnvironment();
  assert.throws(() => processLine('def one := 1 /-', environment), ParseError);
  assert.equal(environment.lookup('one'), undefined);
  assert.equal(processLine('def one := 1', environment), 'defined one');
});

test('nested comments are scanned iteratively', () => {
  assert.deepEqual(parse('/-'.repeat(6_000) + '-/'.repeat(6_000) + 'Nat'), parse('Nat'));
});
