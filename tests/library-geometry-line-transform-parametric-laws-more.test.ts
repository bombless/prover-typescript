import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-line-transform-parametric-laws-more';

test('translated line base and direction laws are kernel checked', () => {
  check([], c.translateLineBaseProof, c.translateLineBaseType);
  check([], c.translateLineDirectionProof, c.translateLineDirectionType);
});

test('rotated line base and direction laws are kernel checked', () => {
  check([], c.rotateLineBaseProof, c.rotateLineBaseType);
  check([], c.rotateLineDirectionProof, c.rotateLineDirectionType);
});

test('transformed line eta law is kernel checked', () =>
  check([], c.transformedLineEtaProof, c.transformedLineEtaType));
