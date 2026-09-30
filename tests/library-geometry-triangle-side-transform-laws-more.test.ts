import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-triangle-side-transform-laws-more';

test('rotated first side metric expression', () => check([], c.rotatedFirstSideMetricProof, c.rotatedFirstSideMetricType));
test('translated second side metric expression', () => check([], c.translatedSecondSideMetricProof, c.translatedSecondSideMetricType));
