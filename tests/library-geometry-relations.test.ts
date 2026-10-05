import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { Type } from '../src/syntax/ast';
import { Vec2, perpendicularVec, perpendicularVecType, axesPerpendicularProof, axesPerpendicularType, samePoint, samePointType, zeroPerpendicularProof, zeroPerpendicularType, axisPerpendicularProof, axisPerpendicularType, samePointClosedProof, samePointClosedType } from '../src/library/geometry-relations';

test('coordinate perpendicularity and point equality propositions are kernel checked', () => {
  check([], Vec2, Type);
  check([], perpendicularVecType, Type);
  check([], axesPerpendicularProof, axesPerpendicularType);
  check([], samePointType, Type);
  check([], zeroPerpendicularProof, zeroPerpendicularType);
  check([], axisPerpendicularProof, axisPerpendicularType);
  check([], samePointClosedProof, samePointClosedType);
});
