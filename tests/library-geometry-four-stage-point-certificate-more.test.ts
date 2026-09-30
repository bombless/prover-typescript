import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { fourStagePointCertificateProof, fourStagePointCertificateType } from '../src/library/geometry-four-stage-point-certificate-more';

test('four stage point certificate checks', () =>
  check([], fourStagePointCertificateProof, fourStagePointCertificateType));
