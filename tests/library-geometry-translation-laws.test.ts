import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { translationUnitProof, translationUnitType } from '../src/library/geometry-translation-laws';

test('translation arithmetic law is kernel checked', () => check([], translationUnitProof, translationUnitType));
