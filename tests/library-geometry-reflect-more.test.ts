import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { reflectLargerProof, reflectLargerType } from '../src/library/geometry-reflections';
test('larger coordinate reflection is kernel checked', () => check([], reflectLargerProof, reflectLargerType));
