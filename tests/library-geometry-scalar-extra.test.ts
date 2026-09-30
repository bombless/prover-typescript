import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { zeroScaleProof, zeroScaleType } from '../src/library/geometry-scalar';

test('zero scalar multiplication gives the zero vector', () => check([], zeroScaleProof, zeroScaleType));
