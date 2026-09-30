import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { rotateScaleTranslateFstProof, rotateScaleTranslateFstType, rotateScaleTranslateSndProof, rotateScaleTranslateSndType } from '../src/library/geometry-affine-composition-parametric-more';

test('rotate scale translate first coordinate law is kernel checked', () => check([], rotateScaleTranslateFstProof, rotateScaleTranslateFstType));
test('rotate scale translate second coordinate law is kernel checked', () => check([], rotateScaleTranslateSndProof, rotateScaleTranslateSndType));
