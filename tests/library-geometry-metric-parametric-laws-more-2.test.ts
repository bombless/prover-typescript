import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as g from '../src/library/geometry-metric-parametric-laws-more-2';

test('additional metric parametric laws are kernel checked', () => {
  check([], g.zeroDotLeftProof, g.zeroDotLeftType);
  check([], g.originDistanceFormulaProof, g.originDistanceFormulaType);
  check([], g.concreteDistanceProof, g.concreteDistanceType);
});
