import assert from 'node:assert/strict';
import test from 'node:test';
import { PassThrough, Readable, Writable } from 'node:stream';
import { startRepl } from '../src/repl/repl';

async function capture(source: string, interactive?: boolean): Promise<string> {
  let transcript = '';
  const output = new Writable({ write(chunk, _encoding, callback) { transcript += chunk.toString(); callback(); } });
  await startRepl(Readable.from([source]), output, { interactive });
  return transcript;
}

test('piped REPL input emits a result without a banner or prompt', async () => {
  assert.equal(await capture('Nat\n'), 'Type\n');
});

test('empty redirected input produces no output', async () => {
  assert.equal(await capture(''), '');
});

test('batch errors remain readable without terminal control output', async () => {
  assert.equal(await capture('unknown\n'), 'Error [ElaborationError]: Unknown variable: unknown\n');
});

test('interactive mode retains its greeting and prompt', async () => {
  const transcript = await capture('', true);
  assert.match(transcript, /prover-typescript REPL/);
  assert.match(transcript, /> /);
});

test('interactive output requires both streams to be terminals', async () => {
  let transcript = '';
  const input = new PassThrough() as PassThrough & { isTTY: boolean };
  input.isTTY = true;
  const output = new Writable({ write(chunk, _encoding, callback) { transcript += chunk.toString(); callback(); } });
  const running = startRepl(input, output);
  input.end('0\n');
  await running;
  assert.equal(transcript, 'Nat\n');
});

test('explicit batch mode can disable terminal formatting', async () => {
  assert.equal(await capture('0\n', false), 'Nat\n');
});

test('a single piped chunk drains dependent declarations through EOF', async () => {
  assert.equal(await capture('def zero := 0\ndef one := Succ zero\none\n'), 'defined zero\ndefined one\nNat\n');
});

test('queued commands continue after a reported batch error', async () => {
  assert.equal(await capture('unknown\n\n0\n'), 'Error [ElaborationError]: Unknown variable: unknown\nNat\n');
});

test('explicit exit stops later commands already buffered in the pipe', async () => {
  assert.equal(await capture('0\nexit\nunknown\n'), 'Nat\n');
});
