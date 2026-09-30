import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { lineBaseDistanceProof, lineBaseDistanceType, rotatedLineBaseDistanceProof, rotatedLineBaseDistanceType } from '../src/library/geometry-line-metric-parametric-more';

test('line base distance expression is kernel checked', () => check([], lineBaseDistanceProof, lineBaseDistanceType));
test('rotated line base distance expression is kernel checked', () => check([], rotatedLineBaseDistanceProof, rotatedLineBaseDistanceType));
