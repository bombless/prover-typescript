import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { Type } from '../src/syntax/ast';
import { Line2, lineThroughOriginX, lineOriginType, lineOriginProof, onVerticalLine, onVerticalLineType, originOnZeroLineProof, originOnZeroLineType, concreteVerticalIncidenceProof, concreteVerticalIncidenceType } from '../src/library/geometry-line';

test('coordinate line objects and incidence predicates are kernel checked', () => {
  check([], Line2, Type);
  check([], lineOriginProof, lineOriginType);
  check([], onVerticalLine, onVerticalLineType);
  check([], originOnZeroLineProof, originOnZeroLineType);
  check([], concreteVerticalIncidenceProof, concreteVerticalIncidenceType);
});
