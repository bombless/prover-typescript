import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import test from 'node:test';
import { goal, proofState } from '../src/proof/state';
import { Nat } from '../src/syntax/ast';

const invalid = [NaN, Infinity, -Infinity, -1, 0.5, Number.MAX_SAFE_INTEGER + 1];

test('invalid explicit goal IDs cannot poison or consume the allocator', () => {
  const before = goal([], Nat).id!;
  for (const id of invalid) assert.throws(() => goal([], Nat, undefined, id), /non-negative safe integer/);
  assert.equal(goal([], Nat).id, before + 1);
});

test('all raw IDs are validated before any reservation changes the allocator', () => {
  const before = goal([], Nat).id!;
  for (const id of invalid) {
    assert.throws(() => proofState([
      { id: before + 100000, context: [], type: Nat },
      { id, context: [], type: Nat },
    ]), /non-negative safe integer/);
  }
  assert.equal(goal([], Nat).id, before + 1);
});

test('invalid focus IDs fail before goals allocate identities', () => {
  const before = goal([], Nat).id!;
  for (const id of invalid) {
    assert.throws(() => proofState([{ context: [], type: Nat }], id), /non-negative safe integer/);
    assert.throws(() => proofState([], id), /non-negative safe integer/);
  }
  assert.equal(goal([], Nat).id, before + 1);
});

test('zero and large safe identities remain valid and reserve following IDs', () => {
  const explicit = goal([], Nat, 'case', 1000000);
  assert.equal(explicit.id, 1000000);
  assert.equal(goal([], Nat).id, 1000001);
  assert.equal(proofState([{ id: 0, context: [], type: Nat }], 0).focusedGoalId, 0);
});

function isolated(script: string): void {
  execFileSync(process.execPath, ['-e', `
    const assert = require('node:assert/strict');
    const { goal, proofState } = require(${JSON.stringify(path.resolve(__dirname, '../src/proof/state.js'))});
    const Nat = { kind: 'Nat' };
    ${script}
  `], { stdio: 'pipe' });
}

test('the last two safe IDs allocate once, then exhaustion throws instead of repeating', () => {
  isolated(`
    assert.equal(goal([], Nat, undefined, Number.MAX_SAFE_INTEGER - 1).id, Number.MAX_SAFE_INTEGER - 1);
    assert.equal(goal([], Nat).id, Number.MAX_SAFE_INTEGER);
    assert.throws(() => goal([], Nat), /Goal ID space exhausted/);
    assert.throws(() => goal([], Nat), /Goal ID space exhausted/);
  `);
});

test('normalization rejects allocation after the largest explicit identity is reserved', () => {
  isolated(`
    const last = { id: Number.MAX_SAFE_INTEGER, context: [], type: Nat };
    assert.equal(proofState([last]).focusedGoalId, Number.MAX_SAFE_INTEGER);
    assert.throws(() => proofState([last, last]), /Goal ID space exhausted/);
    assert.throws(() => proofState([last, { context: [], type: Nat }]), /Goal ID space exhausted/);
  `);
});

test('a missing focus cannot reserve the final identity or poison later goals', () => {
  isolated(`
    const before = goal([], Nat).id;
    assert.throws(() => proofState([
      { id: Number.MAX_SAFE_INTEGER, context: [], type: Nat },
    ], before), /Focused goal does not exist/);
    assert.equal(goal([], Nat).id, before + 1);
  `);
});

test('failed automatic allocation leaves all staged reservations uncommitted', () => {
  isolated(`
    const before = goal([], Nat).id;
    assert.throws(() => proofState([
      { id: Number.MAX_SAFE_INTEGER, context: [], type: Nat },
      { context: [], type: Nat },
    ]), /Goal ID space exhausted/);
    assert.equal(goal([], Nat).id, before + 1);
  `);
});

test('missing focus rolls back ordinary automatic allocations', () => {
  const before = goal([], Nat).id!;
  assert.throws(() => proofState([{ context: [], type: Nat }], before), /Focused goal does not exist/);
  assert.equal(goal([], Nat).id, before + 1);
});
