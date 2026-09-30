import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-triangle-transform-independent-certificates-more';

test('translated triangle vertices', () => {
  check([], c.translatedAProof, c.translatedAType);
  check([], c.translatedBProof, c.translatedBType);
  check([], c.translatedCProof, c.translatedCType);
});
test('rotated triangle vertices', () => {
  check([], c.rotatedAProof, c.rotatedAType);
  check([], c.rotatedBProof, c.rotatedBType);
  check([], c.rotatedCProof, c.rotatedCType);
});
test('reflected triangle vertices', () => {
  check([], c.reflectedAProof, c.reflectedAType);
  check([], c.reflectedBProof, c.reflectedBType);
  check([], c.reflectedCProof, c.reflectedCType);
});
