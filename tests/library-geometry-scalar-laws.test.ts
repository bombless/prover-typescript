import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { oneScaleProof, oneScaleType } from '../src/library/geometry-scalar';

test('one scalar multiplication preserves every vector', () => check([], oneScaleProof, oneScaleType));
