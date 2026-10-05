import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-four-stage-parametric-coordinate-laws-more';

test('four-stage parametric coordinate laws are kernel checked', () => {
  check([], c.transformFstProof, c.transformFstType);
  check([], c.transformSndProof, c.transformSndType);
  check([], c.transformEtaProof, c.transformEtaType);
});
