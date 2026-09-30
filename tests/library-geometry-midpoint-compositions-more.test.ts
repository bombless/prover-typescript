import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { translatedMidpointProof, translatedMidpointType, rotatedMidpointProof, rotatedMidpointType, translatedMidpointFstProof, translatedMidpointFstType, translatedMidpointSndProof, translatedMidpointSndType } from '../src/library/geometry-midpoint-compositions-more';

test('translated midpoint computes', () => check([], translatedMidpointProof, translatedMidpointType));
test('rotated midpoint computes', () => check([], rotatedMidpointProof, rotatedMidpointType));
test('translated midpoint first projection computes', () => check([], translatedMidpointFstProof, translatedMidpointFstType));
test('translated midpoint second projection computes', () => check([], translatedMidpointSndProof, translatedMidpointSndType));
