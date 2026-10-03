import assert from 'node:assert/strict';
import test from 'node:test';
import { PassThrough, Readable, Writable } from 'node:stream';
import { setImmediate } from 'node:timers/promises';
import { startRepl } from '../src/repl/repl';

async function capture(source: string): Promise<string> {
  let transcript = '';
  const output = new Writable({ write(chunk, _encoding, done) { transcript += String(chunk); done(); } });
  await startRepl(Readable.from([source]), output);
  return transcript;
}

test('piped multiline definitions are stored once and available to later input', async () => {
  const source = 'def id := (\n (x : Nat) =>\n x\n)\nid 0\n';
  assert.equal(await capture(source), 'defined id\nNat\n');
});

test('multiline theorem propositions and proofs preserve their declaration', async () => {
  const source = 'theorem self : (\n Eq Nat 0 0) := (\n Refl Nat 0)\nself';
  assert.equal(await capture(source), 'theorem self\nEq Nat 0 0\n');
});

test('parentheses inside either comment form do not affect collection', async () => {
  const source = '( -- a misleading )\n Nat /- another ) ( ) -/\n)\nNat -- (\n';
  assert.equal(await capture(source), 'Type\nType\n');
});

test('nested block comments can span input lines inside a command', async () => {
  const source = 'def n := /- outer\n /- inner ) -- ignored\n -/ ( still outer\n -/ 0\nn\n';
  assert.equal(await capture(source), 'defined n\nNat\n');
});

test('multiline comment-only input produces no result', async () => {
  assert.equal(await capture('/- heading\n ) (\n -/\nNat\n'), 'Type\n');
});

test('failed collected commands are cleared before the following command', async () => {
  const source = 'def bad := (\n unknown)\ndef bad := 0\nbad\n';
  assert.equal(await capture(source), 'Error [ElaborationError]: Unknown variable: unknown\ndefined bad\nNat\n');
});

test('an unmatched closer does not swallow later commands', async () => {
  const transcript = await capture(')(\nNat\n');
  assert.equal((transcript.match(/Error \[ParseError\]/g) ?? []).length, 1);
  assert.match(transcript, /\nType\n$/);
});

test('EOF reports one incomplete-parenthesis error and stores no partial declaration', async () => {
  const transcript = await capture('def incomplete := (\n 0');
  assert.equal((transcript.match(/Error \[ParseError\]/g) ?? []).length, 1);
  assert.match(transcript, /Expected rparen, found 'EOF'/);
  assert.doesNotMatch(transcript, /defined incomplete|\nNat\n|> |\.\.\. /);
});

test('EOF reports an unfinished block at its original opening position', async () => {
  assert.equal(await capture('Nat /- first\n /- inner -/'), 'Error [ParseError]: Unterminated block comment at position 4\n');
});

test('a bare exit line abandons incomplete input and stops queued commands', async () => {
  for (const prefix of ['(\n', '/- unfinished\n']) {
    assert.equal(await capture(prefix + 'exit\nunknown\n'), '');
  }
});

test('interactive collection uses a continuation prompt and restores the primary prompt', async () => {
  const input = new PassThrough();
  let transcript = '';
  const output = new Writable({ write(chunk, _encoding, done) { transcript += String(chunk); done(); } });
  const running = startRepl(input, output, { interactive: true });
  input.write('(\n');
  await setImmediate();
  assert.equal(transcript, 'prover-typescript REPL\n> ... ');
  input.write('Nat)\n');
  await setImmediate();
  assert.equal(transcript, 'prover-typescript REPL\n> ... Type\n> ');
  input.end();
  await running;
});

test('commented exit still works as a complete command after collection', async () => {
  assert.equal(await capture('(\nNat)\nexit -- finished\nunknown\n'), 'Type\n');
});
