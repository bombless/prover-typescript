import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { collinear2, collinear2Type, originCollinearProof, originCollinearType, direction, directionType } from '../src/library/geometry-collinear';

test('collinearity and direction structures are kernel checked', () => {
  check([], collinear2, collinear2Type);
  check([], direction, directionType);
  check([], originCollinearProof, originCollinearType);
});
