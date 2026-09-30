import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { Type } from '../src/syntax/ast';
import { Circle2, onCircle, onCircleType, originCircleProof, originCircleType, originCircleMembershipProof, originCircleMembershipType } from '../src/library/geometry-circle';

test('coordinate circle incidence is kernel checked', () => {
  check([], Circle2, Type);
  check([], onCircle, onCircleType);
  check([], originCircleProof, originCircleType);
  check([], originCircleMembershipProof, originCircleMembershipType);
});
