import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { isZeroSuccQuadProof, isZeroSuccQuadType } from '../src/library/nat-predicates';

test('isZero of four successors is false for every Nat', () =>
  check([], isZeroSuccQuadProof, isZeroSuccQuadType));
