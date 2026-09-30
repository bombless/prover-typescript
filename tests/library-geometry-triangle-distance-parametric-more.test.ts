import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { side12Proof, side12Type, side23Proof, side23Type, side13Proof, side13Type, translatedSide12Proof, translatedSide12Type } from '../src/library/geometry-triangle-distance-parametric-more';

test('triangle side 12 distance expression is kernel checked', () => check([], side12Proof, side12Type));
test('triangle side 23 distance expression is kernel checked', () => check([], side23Proof, side23Type));
test('triangle side 13 distance expression is kernel checked', () => check([], side13Proof, side13Type));
test('translated triangle side distance expression is kernel checked', () => check([], translatedSide12Proof, translatedSide12Type));
