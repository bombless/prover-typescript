import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { cross2, cross2Type, axisCrossProof, axisCrossType, zeroCrossProof, zeroCrossType } from '../src/library/geometry-cross';

test('cross product expression and concrete axis certificate are kernel checked', () => {
  check([], cross2, cross2Type);
  check([], axisCrossProof, axisCrossType);
});
test('zero cross expression is kernel checked', () => check([], zeroCrossProof, zeroCrossType));
