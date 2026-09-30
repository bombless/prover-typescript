import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { reflectRotateFstProof, reflectRotateFstType, reflectRotateSndProof, reflectRotateSndType, translateThenRotateFstProof, translateThenRotateFstType, translateThenRotateSndProof, translateThenRotateSndType } from '../src/library/geometry-transform-coordinate-laws-more';

test('reflect rotate first projection law is kernel checked', () => check([], reflectRotateFstProof, reflectRotateFstType));
test('reflect rotate second projection law is kernel checked', () => check([], reflectRotateSndProof, reflectRotateSndType));
test('translate rotate first projection law is kernel checked', () => check([], translateThenRotateFstProof, translateThenRotateFstType));
test('translate rotate second projection law is kernel checked', () => check([], translateThenRotateSndProof, translateThenRotateSndType));
