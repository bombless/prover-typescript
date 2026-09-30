import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { rotateTranslateFstProof, rotateTranslateFstType, rotateTranslateSndProof, rotateTranslateSndType, translateTwiceProof, translateTwiceType } from '../src/library/geometry-transform-parametric-more';

test('rotate after translation first coordinate law is kernel checked', () => check([], rotateTranslateFstProof, rotateTranslateFstType));
test('rotate after translation second coordinate law is kernel checked', () => check([], rotateTranslateSndProof, rotateTranslateSndType));
test('double translation computes', () => check([], translateTwiceProof, translateTwiceType));
