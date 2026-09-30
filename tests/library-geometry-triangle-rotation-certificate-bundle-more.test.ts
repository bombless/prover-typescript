import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { triangleRotationCertificateBundleProof, triangleRotationCertificateBundleType } from '../src/library/geometry-triangle-rotation-certificate-bundle-more';

test('triangle rotation certificate bundle checks', () =>
  check([], triangleRotationCertificateBundleProof, triangleRotationCertificateBundleType));
