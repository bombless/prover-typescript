import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { vectorCompositeCertificateProof, vectorCompositeCertificateType } from '../src/library/geometry-vector-composite-certificate-more';
test('vector sum dot and cross certificates combine', () =>
  check([], vectorCompositeCertificateProof, vectorCompositeCertificateType));
