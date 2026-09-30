import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { rotatedAreaProof, rotatedAreaType } from '../src/library/geometry-area-chord-more';

test('rotated area expression computes', () => check([], rotatedAreaProof, rotatedAreaType));
