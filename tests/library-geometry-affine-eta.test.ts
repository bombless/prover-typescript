import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { affineEtaProof, affineEtaType } from '../src/library/geometry-affine';

test('affine combination eta law is kernel checked', () => check([], affineEtaProof, affineEtaType));
