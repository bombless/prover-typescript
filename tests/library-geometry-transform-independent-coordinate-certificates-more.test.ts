import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { rotatePointType, rotatePointProof, reflectPointType, reflectPointProof, translatePointType, translatePointProof } from '../src/library/geometry-transform-independent-coordinate-certificates-more';

test('independent rotation coordinate checks', () => check([], rotatePointProof, rotatePointType));
test('independent reflection coordinate checks', () => check([], reflectPointProof, reflectPointType));
test('independent translation coordinate checks', () => check([], translatePointProof, translatePointType));
