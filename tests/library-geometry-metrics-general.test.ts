import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { zeroDotGeneralProof, zeroDotGeneralType } from '../src/library/geometry-metrics';

test('zero vector has zero dot product with every Nat vector', () => {
  check([], zeroDotGeneralProof, zeroDotGeneralType);
});
