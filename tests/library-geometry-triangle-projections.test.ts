import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { triangleFirstVertexProof, triangleFirstVertexType, triangleSecondVertexProof, triangleSecondVertexType, triangleThirdVertexProof, triangleThirdVertexType } from '../src/library/geometry-triangle';

test('triangle vertex projections are kernel checked', () => {
  check([], triangleFirstVertexProof, triangleFirstVertexType);
  check([], triangleSecondVertexProof, triangleSecondVertexType);
  check([], triangleThirdVertexProof, triangleThirdVertexType);
});
