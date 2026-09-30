import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { reflectFstGeneralProof, reflectFstGeneralType, reflectSndGeneralProof, reflectSndGeneralType, reflectTranslatedPointProof, reflectTranslatedPointType } from '../src/library/geometry-reflection-parametric-more';

test('reflection first projection law is kernel checked', () => check([], reflectFstGeneralProof, reflectFstGeneralType));
test('reflection second projection law is kernel checked', () => check([], reflectSndGeneralProof, reflectSndGeneralType));
test('reflected translated point computes', () => check([], reflectTranslatedPointProof, reflectTranslatedPointType));
