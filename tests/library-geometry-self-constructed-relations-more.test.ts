import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-self-constructed-relations-more';

test('self-circle and self-line relations are kernel checked', () => {
  check([], c.selfCircleProof, c.selfCircleType);
  check([], c.selfVerticalProof, c.selfVerticalType);
  check([], c.selfIncidenceProof, c.selfIncidenceType);
});

test('constructed center and base projections are kernel checked', () => {
  check([], c.selfCircleCenterProof, c.selfCircleCenterType);
  check([], c.selfLineBaseProof, c.selfLineBaseType);
});
