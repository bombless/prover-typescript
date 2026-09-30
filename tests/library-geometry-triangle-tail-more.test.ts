import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { triangleConcreteTailProof, triangleConcreteTailType } from '../src/library/geometry-triangle';
test('concrete triangle tail projection is kernel checked', () => check([], triangleConcreteTailProof, triangleConcreteTailType));
