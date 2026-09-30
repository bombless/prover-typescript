import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-triangle-transform-parametric-certificates-more';

test('translated first triangle vertex coordinate law', () => check([], c.translatedFirstVertexProof, c.translatedFirstVertexType));
test('rotated second triangle vertex coordinate law', () => check([], c.rotatedSecondVertexProof, c.rotatedSecondVertexType));
test('reflected third triangle vertex law', () => check([], c.reflectedThirdVertexProof, c.reflectedThirdVertexType));
