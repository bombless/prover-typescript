import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { reflectCoordinateProof, reflectCoordinateType } from '../src/library/geometry-reflections';

test('reflection coordinate pair law is kernel checked', () => check([], reflectCoordinateProof, reflectCoordinateType));
