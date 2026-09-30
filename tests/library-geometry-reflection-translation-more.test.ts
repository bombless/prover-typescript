import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { reflectTranslateProof, reflectTranslateType, translateReflectProof, translateReflectType, reflectRotateTranslateNormProof, reflectRotateTranslateNormType } from '../src/library/geometry-reflection-translation-more';

test('reflection after translation computes', () => check([], reflectTranslateProof, reflectTranslateType));
test('translation after reflection computes', () => check([], translateReflectProof, translateReflectType));
test('reflection rotation translation norm computes', () => check([], reflectRotateTranslateNormProof, reflectRotateTranslateNormType));
