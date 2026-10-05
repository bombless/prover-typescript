import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as g from '../src/library/geometry-composition-full-laws-more-2';

test('full composition coordinate laws are kernel checked', () => {
  check([], g.scaleComposeFullProof, g.scaleComposeFullType);
  check([], g.translateComposeFullProof, g.translateComposeFullType);
  check([], g.rotateTranslateFullProof, g.rotateTranslateFullType);
});
