import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { scaleConcreteFstProof, scaleConcreteFstType, scaleConcreteSndProof, scaleConcreteSndType, scalePairProof, scalePairType } from '../src/library/geometry-scalar-parametric-more';

test('concrete scale first coordinate computes', () => check([], scaleConcreteFstProof, scaleConcreteFstType));
test('concrete scale second coordinate computes', () => check([], scaleConcreteSndProof, scaleConcreteSndType));
test('parameterized scale pair formula is kernel checked', () => check([], scalePairProof, scalePairType));
