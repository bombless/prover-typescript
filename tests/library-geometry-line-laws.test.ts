import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { originIncidence, originIncidenceProof, originIncidenceType, verticalIncidenceType } from '../src/library/geometry-line-laws';
import { Type } from '../src/syntax/ast';

test('line incidence laws are kernel checked', () => {
  check([], originIncidence, Type);
  check([], originIncidenceProof, originIncidenceType);
  check([], verticalIncidenceType, Type);
});
