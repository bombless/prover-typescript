import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-transformed-incidence-parametric-more';

test('translated point coordinate and vertical relation are kernel checked', () => {
  check([], c.translatedPointFstProof, c.translatedPointFstType);
  check([], c.translatedSelfVerticalProof, c.translatedSelfVerticalType);
});

test('translated incidence and base formulas are kernel checked', () => {
  check([], c.translatedIncidenceProof, c.translatedIncidenceType);
  check([], c.translatedLineBaseProof, c.translatedLineBaseType);
});
