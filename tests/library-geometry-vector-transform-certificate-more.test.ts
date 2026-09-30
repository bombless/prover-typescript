import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { vectorTransformCertificateProof, vectorTransformCertificateType } from '../src/library/geometry-vector-transform-certificate-more';
test('vector transform and metric certificates combine', () =>
  check([], vectorTransformCertificateProof, vectorTransformCertificateType));
