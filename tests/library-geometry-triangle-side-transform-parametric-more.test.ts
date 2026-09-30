import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { rotatedSecondFstProof, rotatedSecondFstType, rotatedSecondSndProof, rotatedSecondSndType, translatedFirstSideProof, translatedFirstSideType, translatedThirdFstProof, translatedThirdFstType, translatedThirdSndProof, translatedThirdSndType } from '../src/library/geometry-triangle-side-transform-parametric-more';

test('rotated second vertex first coordinate is exposed', () => check([], rotatedSecondFstProof, rotatedSecondFstType));
test('rotated second vertex second coordinate is exposed', () => check([], rotatedSecondSndProof, rotatedSecondSndType));
test('translated first side remains a metric expression', () => check([], translatedFirstSideProof, translatedFirstSideType));
test('translated third vertex first coordinate is explicit', () => check([], translatedThirdFstProof, translatedThirdFstType));
test('translated third vertex second coordinate is explicit', () => check([], translatedThirdSndProof, translatedThirdSndType));
