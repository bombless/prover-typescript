import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { reflectedCircleCertificateProof, reflectedCircleCertificateType } from '../src/library/geometry-circle-reflection-certificate-more';
test('reflected circle center certificate checks', () =>
  check([], reflectedCircleCertificateProof, reflectedCircleCertificateType));
