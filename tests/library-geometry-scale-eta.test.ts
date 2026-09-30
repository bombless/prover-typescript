import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { scaleEtaProof, scaleEtaType } from '../src/library/geometry-scalar';

test('scale eta law is kernel checked', () => check([], scaleEtaProof, scaleEtaType));
