import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { translateTwiceConcreteProof, translateTwiceConcreteType, reflectRotateProof, reflectRotateType, translatedNormProof, translatedNormType, rotatedDistanceProof, rotatedDistanceType, reflectedDotProof, reflectedDotType, translatedFstProof, translatedFstType, translatedSndProof, translatedSndType } from '../src/library/geometry-transform-laws-more';

test('double translation computes concretely', () => check([], translateTwiceConcreteProof, translateTwiceConcreteType));
test('reflection after rotation computes concretely', () => check([], reflectRotateProof, reflectRotateType));
test('translated norm computes concretely', () => check([], translatedNormProof, translatedNormType));
test('rotated distance computes concretely', () => check([], rotatedDistanceProof, rotatedDistanceType));
test('reflected dot product computes concretely', () => check([], reflectedDotProof, reflectedDotType));
test('translated first projection is kernel checked', () => check([], translatedFstProof, translatedFstType));
test('translated second projection is kernel checked', () => check([], translatedSndProof, translatedSndType));
