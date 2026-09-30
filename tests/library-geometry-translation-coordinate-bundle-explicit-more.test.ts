import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { translatedFstGeneralProof,translatedFstGeneralType,translatedSndGeneralProof,translatedSndGeneralType } from '../src/library/geometry-translation-coordinate-bundle-explicit-more';
test('general translation first projection checks',()=>check([],translatedFstGeneralProof,translatedFstGeneralType));
test('general translation second projection checks',()=>check([],translatedSndGeneralProof,translatedSndGeneralType));
