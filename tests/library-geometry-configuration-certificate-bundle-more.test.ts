import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { configurationCertificateBundleProof, configurationCertificateBundleType } from '../src/library/geometry-configuration-certificate-bundle-more';

test('configuration certificate bundle checks', () =>
  check([], configurationCertificateBundleProof, configurationCertificateBundleType));
