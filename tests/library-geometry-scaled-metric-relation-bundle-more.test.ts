import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-scaled-metric-relation-bundle-more';

test('scaled norm formula is kernel checked', () => check([], c.scaledNormProof, c.scaledNormType));
test('scaled dot formula is kernel checked', () => check([], c.scaledDotProof, c.scaledDotType));
test('scaled cross formula is kernel checked', () => check([], c.scaledCrossProof, c.scaledCrossType));
