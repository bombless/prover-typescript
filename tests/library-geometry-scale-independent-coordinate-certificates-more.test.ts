import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { scaleTwoFstType, scaleTwoFstProof, scaleTwoSndType, scaleTwoSndProof, scaleThreeFstType, scaleThreeFstProof, scaleThreeSndType, scaleThreeSndProof } from '../src/library/geometry-scale-independent-coordinate-certificates-more';

test('scale two first coordinate check', () => check([], scaleTwoFstProof, scaleTwoFstType));
test('scale two second coordinate check', () => check([], scaleTwoSndProof, scaleTwoSndType));
test('scale three first coordinate check', () => check([], scaleThreeFstProof, scaleThreeFstType));
test('scale three second coordinate check', () => check([], scaleThreeSndProof, scaleThreeSndType));
