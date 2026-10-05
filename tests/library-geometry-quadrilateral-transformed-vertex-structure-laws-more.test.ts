import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-quadrilateral-transformed-vertex-structure-laws-more';

test('transformed quadrilateral second vertex', () => check([], c.transformedQuadrilateralSecondProof, c.transformedQuadrilateralSecondType));
test('transformed quadrilateral third vertex', () => check([], c.transformedQuadrilateralThirdProof, c.transformedQuadrilateralThirdType));
test('transformed quadrilateral vertices eta', () => check([], c.transformedQuadrilateralVerticesEtaProof, c.transformedQuadrilateralVerticesEtaType));
