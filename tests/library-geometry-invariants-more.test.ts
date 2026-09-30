import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { scaleRotateReflectProof, scaleRotateReflectType, scaleRotateReflectNormProof, scaleRotateReflectNormType, scaleTranslateDotProof, scaleTranslateDotType, transformedDistanceMoreProof, transformedDistanceMoreType } from '../src/library/geometry-invariants-more';

test('scale rotate reflect pipeline computes', () => check([], scaleRotateReflectProof, scaleRotateReflectType));
test('scale rotate reflect norm computes', () => check([], scaleRotateReflectNormProof, scaleRotateReflectNormType));
test('scale translate dot product computes', () => check([], scaleTranslateDotProof, scaleTranslateDotType));
test('transformed distance computes', () => check([], transformedDistanceMoreProof, transformedDistanceMoreType));
