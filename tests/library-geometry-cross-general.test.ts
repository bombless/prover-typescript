import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { zeroCrossGeneralProof, zeroCrossGeneralType } from '../src/library/geometry-cross';

test('cross products with zero vectors vanish for every vector', () => {
  check([], zeroCrossGeneralProof, zeroCrossGeneralType);
});
