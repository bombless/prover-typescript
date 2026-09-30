import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { intersectionCertificateProof, intersectionCertificateType } from '../src/library/geometry-circle-line-intersection-certificate-more';
test('circle-line intersection certificate checks', () =>
  check([], intersectionCertificateProof, intersectionCertificateType));
