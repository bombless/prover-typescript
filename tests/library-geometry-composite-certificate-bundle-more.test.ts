import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-composite-certificate-bundle-more';

test('concrete composite affine certificate bundle', () => check([], c.compositeCertificateBundleProof, c.compositeCertificateBundleType));
