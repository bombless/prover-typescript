import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { rotateNormType, rotateNormProof, reflectNormType, reflectNormProof, translateNormType, translateNormProof } from '../src/library/geometry-transform-independent-metric-certificates-more';

test('rotated norm checks', () => check([], rotateNormProof, rotateNormType));
test('reflected norm checks', () => check([], reflectNormProof, reflectNormType));
test('translated norm checks', () => check([], translateNormProof, translateNormType));
