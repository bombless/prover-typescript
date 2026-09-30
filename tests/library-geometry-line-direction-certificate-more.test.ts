import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { lineDirectionCertificateProof, lineDirectionCertificateType } from '../src/library/geometry-line-direction-certificate-more';
test('line base direction parallel and perpendicular certificates bundle', () =>
  check([], lineDirectionCertificateProof, lineDirectionCertificateType));
