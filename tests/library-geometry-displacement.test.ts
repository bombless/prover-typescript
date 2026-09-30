import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { displacementZeroProof, displacementZeroType, displacementConcreteProof, displacementConcreteType, displacementReverseTruncatedProof, displacementReverseTruncatedType, displacementXAxisProof, displacementXAxisType, displacementYAxisProof, displacementYAxisType } from '../src/library/geometry-displacement';

test('zero displacement is kernel checked', () => check([], displacementZeroProof, displacementZeroType));
test('concrete squared displacement is kernel checked', () => check([], displacementConcreteProof, displacementConcreteType));
test('reverse truncated displacement is kernel checked', () => check([], displacementReverseTruncatedProof, displacementReverseTruncatedType));
test('x-axis displacement is kernel checked', () => check([], displacementXAxisProof, displacementXAxisType));
test('y-axis displacement is kernel checked', () => check([], displacementYAxisProof, displacementYAxisType));
