import assert from 'node:assert/strict';
import test from 'node:test';
import { elaborate } from '../src/elaborator/elaborate';
import { parse } from '../src/parser/parser';
import { infer, show } from '../src/kernel/typecheck';

test('source text reaches the Kernel through Surface AST and elaboration', () => {
  const surface = parse('(x : Nat) => x');
  assert.equal(surface.kind, 'Lambda');
  const core = elaborate(surface);
  assert.equal(core.kind, 'Lambda');
  assert.equal(core.body.kind, 'Var');
  assert.equal(core.body.index, 0);
  assert.equal(show(infer([], core)), '(x : Nat) -> Nat');
});
