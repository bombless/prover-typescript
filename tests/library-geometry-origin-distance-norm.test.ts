import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { originDistanceProof, originDistanceType } from '../src/library/geometry-distance';

test('origin distance is kernel checked', () => check([], originDistanceProof, originDistanceType));
