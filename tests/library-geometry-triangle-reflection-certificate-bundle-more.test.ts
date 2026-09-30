import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { triangleReflectionCertificateBundleProof, triangleReflectionCertificateBundleType } from '../src/library/geometry-triangle-reflection-certificate-bundle-more';

test('triangle reflection certificate bundle checks', () =>
  check([], triangleReflectionCertificateBundleProof, triangleReflectionCertificateBundleType));
