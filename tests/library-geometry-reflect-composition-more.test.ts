import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { reflectTwiceLargerProof, reflectTwiceLargerType } from '../src/library/geometry-reflections';
test('concrete double reflection is kernel checked', () => check([], reflectTwiceLargerProof, reflectTwiceLargerType));
