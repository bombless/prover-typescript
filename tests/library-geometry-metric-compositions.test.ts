import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { scaledNormConcreteProof, scaledNormConcreteType, rotatedAxisDotConcreteProof, rotatedAxisDotConcreteType, crossConcreteMoreProof, crossConcreteMoreType, sameVectorDotProof, sameVectorDotType, zeroScaledNormProof, zeroScaledNormType } from '../src/library/geometry-metric-compositions';

test('scaled norm computes through the metric definitions', () => check([], scaledNormConcreteProof, scaledNormConcreteType));
test('rotated axis dot product computes', () => check([], rotatedAxisDotConcreteProof, rotatedAxisDotConcreteType));
test('cross expression computes for concrete vectors', () => check([], crossConcreteMoreProof, crossConcreteMoreType));
test('same-vector dot product computes', () => check([], sameVectorDotProof, sameVectorDotType));
test('zero scaling has zero norm', () => check([], zeroScaledNormProof, zeroScaledNormType));
