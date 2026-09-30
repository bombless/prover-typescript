import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { scaleConcreteTwoProof, scaleConcreteTwoType } from '../src/library/geometry-scalar';
test('concrete scalar multiplication now reduces through projections', () => check([], scaleConcreteTwoProof, scaleConcreteTwoType));
