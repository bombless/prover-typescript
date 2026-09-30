import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-swap-translate-composite-certificates-more';

test('swap translate point P', () => check([], c.transformedPProof, c.transformedPType));
test('swap translate point Q', () => check([], c.transformedQProof, c.transformedQType));
test('swap translate midpoint', () => check([], c.transformedMidpointProof, c.transformedMidpointType));
test('swap translate midpoint norm', () => check([], c.transformedMidpointNormProof, c.transformedMidpointNormType));
