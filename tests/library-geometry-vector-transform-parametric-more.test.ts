import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { reflectRotateScaleFstProof, reflectRotateScaleFstType, reflectRotateScaleSndProof, reflectRotateScaleSndType, transformedCoordinateSumProof, transformedCoordinateSumType } from '../src/library/geometry-vector-transform-parametric-more';

test('reflect rotate scale first coordinate law is kernel checked', () => check([], reflectRotateScaleFstProof, reflectRotateScaleFstType));
test('reflect rotate scale second coordinate law is kernel checked', () => check([], reflectRotateScaleSndProof, reflectRotateScaleSndType));
test('transformed coordinate sum law is kernel checked', () => check([], transformedCoordinateSumProof, transformedCoordinateSumType));
