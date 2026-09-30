import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { translateFstCoordinateType, translateFstCoordinateProof, translateSndCoordinateType, translateSndCoordinateProof, translateZeroFstType, translateZeroFstProof, translateZeroSndType, translateZeroSndProof } from '../src/library/geometry-translation-independent-coordinate-certificates-more';

test('translation first coordinate check', () => check([], translateFstCoordinateProof, translateFstCoordinateType));
test('translation second coordinate check', () => check([], translateSndCoordinateProof, translateSndCoordinateType));
test('zero translation first coordinate check', () => check([], translateZeroFstProof, translateZeroFstType));
test('zero translation second coordinate check', () => check([], translateZeroSndProof, translateZeroSndType));
