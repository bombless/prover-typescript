import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { dotFirstCoordinateProof, dotFirstCoordinateType, dotSecondCoordinateProof, dotSecondCoordinateType } from '../src/library/geometry-metrics';

test('dot product coordinate extraction laws are kernel checked', () => {
  check([], dotFirstCoordinateProof, dotFirstCoordinateType);
  check([], dotSecondCoordinateProof, dotSecondCoordinateType);
});
