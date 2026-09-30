import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { triangleOriginVertexProof, triangleOriginVertexType, triangleOriginSecondVertexProof, triangleOriginSecondVertexType, triangleOriginThirdVertexProof, triangleOriginThirdVertexType } from '../src/library/geometry-triangle';

test('triangle origin vertex projection is kernel checked', () => check([], triangleOriginVertexProof, triangleOriginVertexType));
test('triangle second and third vertex projections are kernel checked', () => {
  check([], triangleOriginSecondVertexProof, triangleOriginSecondVertexType);
  check([], triangleOriginThirdVertexProof, triangleOriginThirdVertexType);
});
