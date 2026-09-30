import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { Type } from '../src/syntax/ast';
import { incidence, incidenceType, originIncidenceProof, originIncidenceType, Point2, Line2 } from '../src/library/geometry-incidence';

test('point-line incidence over coordinate objects is kernel checked', () => {
  check([], Point2, Type);
  check([], Line2, Type);
  check([], incidence, incidenceType);
  check([], originIncidenceProof, originIncidenceType);
});
