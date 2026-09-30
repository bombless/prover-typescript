import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { translateCircleCenterFstProof, translateCircleCenterFstType, translateCircleCenterSndProof, translateCircleCenterSndType, rotateCircleCenterFstProof, rotateCircleCenterFstType, rotateCircleCenterSndProof, rotateCircleCenterSndType } from '../src/library/geometry-circle-transform-parametric-more';

test('translated circle center first coordinate law is kernel checked', () => check([], translateCircleCenterFstProof, translateCircleCenterFstType));
test('translated circle center second coordinate law is kernel checked', () => check([], translateCircleCenterSndProof, translateCircleCenterSndType));
test('rotated circle center first coordinate law is kernel checked', () => check([], rotateCircleCenterFstProof, rotateCircleCenterFstType));
test('rotated circle center second coordinate law is kernel checked', () => check([], rotateCircleCenterSndProof, rotateCircleCenterSndType));
