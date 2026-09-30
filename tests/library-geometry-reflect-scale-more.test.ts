import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { reflectScaleProof, reflectScaleType, reflectScaleNormProof, reflectScaleNormType } from '../src/library/geometry-reflect-scale-more';

test('reflect scale concrete vector computes', () => check([], reflectScaleProof, reflectScaleType));
test('reflect scale norm computes', () => check([], reflectScaleNormProof, reflectScaleNormType));
