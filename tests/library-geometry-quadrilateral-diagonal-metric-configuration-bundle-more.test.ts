import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-quadrilateral-diagonal-metric-configuration-bundle-more';

test('quadrilateral diagonal metric configuration bundle', () => check([], c.quadrilateralDiagonalMetricBundleProof, c.quadrilateralDiagonalMetricBundleType));
