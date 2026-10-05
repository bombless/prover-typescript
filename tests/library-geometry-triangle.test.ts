import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { Type } from '../src/syntax/ast';
import { Triangle2, triangleOriginProof, triangleOriginType, degenerateTriangleProof, degenerateTriangleType, triangleVerticesProof, triangleVerticesType, triangleConcreteEdgeDistanceProof, triangleConcreteEdgeDistanceType } from '../src/library/geometry-triangle';

test('triangle objects and degenerate triangle certificates are kernel checked', () => {
  check([], Triangle2, Type);
  check([], triangleOriginProof, triangleOriginType);
  check([], degenerateTriangleProof, degenerateTriangleType);
  check([], triangleVerticesProof, triangleVerticesType);
  check([], triangleConcreteEdgeDistanceProof, triangleConcreteEdgeDistanceType);
});
