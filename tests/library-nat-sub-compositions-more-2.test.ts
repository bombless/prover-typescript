import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as n from '../src/library/nat-sub-compositions-more-2';
test('additional subtraction composition laws are kernel checked', () => {
  check([], n.subZeroParametricProof, n.subZeroParametricType);
  check([], n.subSuccParametricProof, n.subSuccParametricType);
  check([], n.subTwiceParametricProof, n.subTwiceParametricType);
});
