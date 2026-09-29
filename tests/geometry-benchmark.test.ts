import test from 'node:test';
import assert from 'node:assert/strict';
import { check, show } from '../src/kernel/typecheck';
import { GEOMETRY_BENCHMARK } from '../src/library/geometry';
import { RealProofEngine } from '../src/ui/proof-engine';

test('geometry benchmark exposes ten Kernel-checkable theorem signatures', () => {
  assert.equal(GEOMETRY_BENCHMARK.length, 10);
  for (const theorem of GEOMETRY_BENCHMARK) {
    check([], theorem.proof, theorem.type);
    assert.ok(show(theorem.type).length > 0);
  }
});

test('geometry benchmark is reachable through the real proof engine', () => {
  const engine = new RealProofEngine();
  for (const theorem of GEOMETRY_BENCHMARK) {
    const state = engine.loadTheorem(theorem.id);
    assert.equal(state.completed, false);
    const result = engine.runTactic(`exact ${theorem.id}`);
    assert.equal(result.kind, 'success');
    assert.equal(result.state.completed, true);
  }
});
