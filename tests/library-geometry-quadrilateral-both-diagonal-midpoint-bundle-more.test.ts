import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-quadrilateral-both-diagonal-midpoint-bundle-more';

test('both quadrilateral diagonal midpoint bundle', () => check([], c.quadrilateralBothDiagonalMidpointProof, c.quadrilateralBothDiagonalMidpointType));
