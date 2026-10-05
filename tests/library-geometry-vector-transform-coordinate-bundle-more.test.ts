import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-vector-transform-coordinate-bundle-more';

test('vector transform coordinate bundle', () => check([], c.transformCoordinateBundleProof, c.transformCoordinateBundleType));
test('transformed vector eta reconstruction', () => check([], c.transformedPointEtaProof, c.transformedPointEtaType));
