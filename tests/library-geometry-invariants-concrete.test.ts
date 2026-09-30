import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { rotateNormProof, rotateNormType, reflectNormProof, reflectNormType, translatedPairDistanceProof, translatedPairDistanceType, reflectedAxisDotProof, reflectedAxisDotType, rotateTwiceNormProof, rotateTwiceNormType } from '../src/library/geometry-invariants-concrete';

test('rotation preserves a concrete norm', () => check([], rotateNormProof, rotateNormType));
test('reflection preserves a concrete norm', () => check([], reflectNormProof, reflectNormType));
test('translated pair distance computes', () => check([], translatedPairDistanceProof, translatedPairDistanceType));
test('reflected axis dot product computes', () => check([], reflectedAxisDotProof, reflectedAxisDotType));
test('double rotation norm computes', () => check([], rotateTwiceNormProof, rotateTwiceNormType));
