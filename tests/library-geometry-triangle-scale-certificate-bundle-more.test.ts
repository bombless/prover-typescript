import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { triangleScaleCertificateBundleProof, triangleScaleCertificateBundleType } from '../src/library/geometry-triangle-scale-certificate-bundle-more';

test('triangle scale certificate bundle checks', () =>
  check([], triangleScaleCertificateBundleProof, triangleScaleCertificateBundleType));
