import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { triangleConcreteSecondVertexProof, triangleConcreteSecondVertexType, triangleConcreteThirdVertexProof, triangleConcreteThirdVertexType } from '../src/library/geometry-triangle';
test('concrete second and third triangle projections are kernel checked', () => {
  check([], triangleConcreteSecondVertexProof, triangleConcreteSecondVertexType);
  check([], triangleConcreteThirdVertexProof, triangleConcreteThirdVertexType);
});
