import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { translateLineBaseFstProof, translateLineBaseFstType, translateLineBaseSndProof, translateLineBaseSndType, rotateLineDirectionFstProof, rotateLineDirectionFstType, rotateLineDirectionSndProof, rotateLineDirectionSndType } from '../src/library/geometry-line-parametric-transform-more';

test('translated line base first coordinate law is kernel checked', () => check([], translateLineBaseFstProof, translateLineBaseFstType));
test('translated line base second coordinate law is kernel checked', () => check([], translateLineBaseSndProof, translateLineBaseSndType));
test('rotated line direction first coordinate law is kernel checked', () => check([], rotateLineDirectionFstProof, rotateLineDirectionFstType));
test('rotated line direction second coordinate law is kernel checked', () => check([], rotateLineDirectionSndProof, rotateLineDirectionSndType));
