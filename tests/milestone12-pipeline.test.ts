import assert from 'node:assert/strict';
import test from 'node:test';
import { GlobalEnvironment } from '../src/environment/environment';
import { elaborate } from '../src/elaborator/elaborate';
import { parseCommand } from '../src/parser/command';
import { infer, show } from '../src/kernel/typecheck';

test('source commands flow through environment-aware elaboration into the Kernel', () => {
  const environment = new GlobalEnvironment();
  const zero = parseCommand('def zero := 0');
  assert.equal(zero.kind, 'def');
  if (zero.kind !== 'def') throw new Error('expected definition command');
  const zeroCore = elaborate(zero.term, [], environment);
  infer([], zeroCore);
  environment.define(zero.name, zeroCore);

  const one = parseCommand('def one := Succ zero');
  assert.equal(one.kind, 'def');
  if (one.kind !== 'def') throw new Error('expected definition command');
  const oneCore = elaborate(one.term, [], environment);
  assert.equal(show(infer([], oneCore)), 'Nat');
  environment.define(one.name, oneCore);

  const use = parseCommand('one');
  assert.equal(use.kind, 'term');
  if (use.kind !== 'term') throw new Error('expected term command');
  const useCore = elaborate(use.term, [], environment);
  assert.equal(show(infer([], useCore)), 'Nat');
});
