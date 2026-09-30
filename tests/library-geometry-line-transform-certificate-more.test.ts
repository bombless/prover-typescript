import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { transformedLineCertificateProof, transformedLineCertificateType } from '../src/library/geometry-line-transform-certificate-more';
test('transformed line base direction and relation certificates bundle', () =>
  check([], transformedLineCertificateProof, transformedLineCertificateType));
