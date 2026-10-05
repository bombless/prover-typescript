import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-vector-composition-certificates-more';

test('scale then rotate vector formula', () => check([], c.scaleRotateProof, c.scaleRotateType));
test('scale rotate reflect vector formula', () => check([], c.scaleRotateReflectProof, c.scaleRotateReflectType));
test('translate then rotate point formula', () => check([], c.translateRotateProof, c.translateRotateType));
test('scaled rotated first projection', () => check([], c.scaleRotateFstProof, c.scaleRotateFstType));
test('scaled rotated second projection', () => check([], c.scaleRotateSndProof, c.scaleRotateSndType));
