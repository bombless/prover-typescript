import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { affineLeftOriginProof, affineLeftOriginType, affineRightOriginProof, affineRightOriginType } from '../src/library/geometry-affine';

test('affine origin on the left preserves a point', () => check([], affineLeftOriginProof, affineLeftOriginType));
test('affine origin on the right preserves a point', () => check([], affineRightOriginProof, affineRightOriginType));
