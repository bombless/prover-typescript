import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-transform-chain-recovery-bundle-more';

test('transform recovery certificates are kernel checked', () => {
  check([], c.rotateRecoverProof, c.rotateRecoverType);
  check([], c.reflectRecoverProof, c.reflectRecoverType);
  check([], c.translateRecoverProof, c.translateRecoverType);
  check([], c.scaleZeroProof, c.scaleZeroType);
});
test('combined transformation and metric certificates are kernel checked', () => {
  check([], c.chainedPointProof, c.chainedPointType);
  check([], c.chainedNormProof, c.chainedNormType);
});
test('general recovery laws remain kernel checked', () => {
  check([], c.rotate90TwiceProof, c.rotate90TwiceType);
  check([], c.translateZeroProof, c.translateZeroType);
});
