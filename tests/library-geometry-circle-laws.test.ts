import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { originOnOriginCircleProof, originOnOriginCircleType, unitCircleProof, unitCircleType } from '../src/library/geometry-circle-laws';

test('circle certificates are kernel checked', () => {
  check([], originOnOriginCircleProof, originOnOriginCircleType);
  check([], unitCircleProof, unitCircleType);
});
