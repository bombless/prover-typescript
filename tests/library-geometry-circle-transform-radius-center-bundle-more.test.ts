import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-circle-transform-radius-center-bundle-more';

test('circle radius preservation laws are kernel checked', () => {
  check([], c.translateRadiusProof, c.translateRadiusType);
  check([], c.rotateRadiusProof, c.rotateRadiusType);
  check([], c.reflectRadiusProof, c.reflectRadiusType);
});

test('circle center transformation laws are kernel checked', () => {
  check([], c.translateCenterProof, c.translateCenterType);
  check([], c.rotateCenterProof, c.rotateCenterType);
  check([], c.reflectCenterProof, c.reflectCenterType);
});

test('self-centered circle radius law is kernel checked', () =>
  check([], c.selfRadiusProof, c.selfRadiusType));
