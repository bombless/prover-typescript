import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-uniform-transform-circle-line-triangle-bundle-more';

test('uniform transformed triangle A', () => check([], c.taProof, c.taType));
test('uniform transformed triangle B', () => check([], c.tbProof, c.tbType));
test('uniform transformed A norm', () => check([], c.taNormProof, c.taNormType));
test('uniform transformed A circle', () => check([], c.taCircleProof, c.taCircleType));
test('uniform transformed A incidence', () => check([], c.taIncidenceProof, c.taIncidenceType));
test('uniform transformed B vertical', () => check([], c.tbVerticalProof, c.tbVerticalType));
