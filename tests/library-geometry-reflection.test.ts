import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { reflectXIdentityProof, reflectXIdentityType, reflectXInvolutionProof, reflectXInvolutionType } from '../src/library/geometry-reflections';

test('reflection identity for arbitrary points is kernel checked', () => check([], reflectXIdentityProof, reflectXIdentityType));
test('reflection involution is kernel checked', () => check([], reflectXInvolutionProof, reflectXInvolutionType));
