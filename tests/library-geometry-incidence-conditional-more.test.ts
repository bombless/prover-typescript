import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { incidenceOfXEqualityProof, incidenceOfXEqualityType, originLineIncidenceProof, originLineIncidenceType } from '../src/library/geometry-incidence-conditional-more';
test('incidence follows from matching x coordinates', () => check([], incidenceOfXEqualityProof, incidenceOfXEqualityType));
test('zero x coordinate gives incidence with the origin line', () => check([], originLineIncidenceProof, originLineIncidenceType));
