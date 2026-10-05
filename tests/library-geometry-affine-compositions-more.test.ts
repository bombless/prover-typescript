import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { scaleTranslateFstProof, scaleTranslateFstType, scaleTranslateSndProof, scaleTranslateSndType, scaleTranslatePointProof, scaleTranslatePointType, scaleTranslateConcreteProof, scaleTranslateConcreteType } from '../src/library/geometry-affine-compositions-more';

test('parameterized scaled translation first coordinate is kernel checked', () => check([], scaleTranslateFstProof, scaleTranslateFstType));
test('parameterized scaled translation second coordinate is kernel checked', () => check([], scaleTranslateSndProof, scaleTranslateSndType));
test('parameterized scaled translation point formula is kernel checked', () => check([], scaleTranslatePointProof, scaleTranslatePointType));
test('concrete scaled translation computes', () => check([], scaleTranslateConcreteProof, scaleTranslateConcreteType));
