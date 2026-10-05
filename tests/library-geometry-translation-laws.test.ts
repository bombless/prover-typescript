import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { translationUnitProof, translationUnitType } from '../src/library/geometry-translation-laws';
import { translateOriginGeneralProof, translateOriginGeneralType } from '../src/library/geometry-transform';

test('translation arithmetic law is kernel checked', () => check([], translationUnitProof, translationUnitType));
test('translation composition and origin laws are kernel checked', () => {
  check([], translateOriginGeneralProof, translateOriginGeneralType);
});
