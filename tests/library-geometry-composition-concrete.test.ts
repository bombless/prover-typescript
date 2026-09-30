import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { rotateAfterTranslateProof, rotateAfterTranslateType, translateAfterRotateProof, translateAfterRotateType, rotateSwapProof, rotateSwapType, reflectAfterRotateProof, reflectAfterRotateType, rotateAfterReflectProof, rotateAfterReflectType, reflectRotateReflectProof, reflectRotateReflectType } from '../src/library/geometry-composition-concrete';
test('rotation after translation is kernel checked', () => check([], rotateAfterTranslateProof, rotateAfterTranslateType));
test('translation after rotation is kernel checked', () => check([], translateAfterRotateProof, translateAfterRotateType));
test('coordinate swap rotation composition is kernel checked', () => check([], rotateSwapProof, rotateSwapType));
test('reflection after rotation is kernel checked', () => check([], reflectAfterRotateProof, reflectAfterRotateType));
test('rotation after reflection is kernel checked', () => check([], rotateAfterReflectProof, rotateAfterReflectType));
test('reflection-rotation-reflection is kernel checked', () => check([], reflectRotateReflectProof, reflectRotateReflectType));
