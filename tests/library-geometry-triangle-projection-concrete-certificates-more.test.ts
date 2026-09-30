import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-triangle-projection-concrete-certificates-more';

test('triangle first vertex projection', () => check([], c.firstProjectionProof, c.firstProjectionType));
test('triangle second vertex projection', () => check([], c.secondProjectionProof, c.secondProjectionType));
test('triangle third vertex projection', () => check([], c.thirdProjectionProof, c.thirdProjectionType));
test('triangle tail projection', () => check([], c.tailProjectionProof, c.tailProjectionType));
