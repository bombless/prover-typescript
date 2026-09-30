import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { firstSecondSideProof, firstSecondSideType, secondThirdSideProof, secondThirdSideType, firstThirdSideProof, firstThirdSideType, rotatedFirstSideProof, rotatedFirstSideType, translatedThirdSideProof, translatedThirdSideType, rotatedFirstSideConcreteProof, rotatedFirstSideConcreteType, translatedThirdSideConcreteProof, translatedThirdSideConcreteType } from '../src/library/geometry-triangle-measurements';

test('first and second triangle vertices are measurable', () => check([], firstSecondSideProof, firstSecondSideType));
test('second and third triangle vertices are measurable', () => check([], secondThirdSideProof, secondThirdSideType));
test('first and third triangle vertices are measurable', () => check([], firstThirdSideProof, firstThirdSideType));
test('rotated triangle side computes', () => check([], rotatedFirstSideProof, rotatedFirstSideType));
test('translated triangle side computes', () => check([], translatedThirdSideProof, translatedThirdSideType));
test('rotated triangle side has concrete value', () => check([], rotatedFirstSideConcreteProof, rotatedFirstSideConcreteType));
test('translated triangle side has concrete value', () => check([], translatedThirdSideConcreteProof, translatedThirdSideConcreteType));
