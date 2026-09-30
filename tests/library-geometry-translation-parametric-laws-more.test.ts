import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { translateShapeProof, translateShapeType, translateFstGeneralProof, translateFstGeneralType, translateSndGeneralProof, translateSndGeneralType } from '../src/library/geometry-translation-parametric-laws-more';

test('translation shape formula is kernel checked', () => check([], translateShapeProof, translateShapeType));
test('translation first coordinate law is kernel checked', () => check([], translateFstGeneralProof, translateFstGeneralType));
test('translation second coordinate law is kernel checked', () => check([], translateSndGeneralProof, translateSndGeneralType));
