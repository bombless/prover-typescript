import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { triangleEtaProof, triangleEtaType } from '../src/library/geometry-triangle';

test('triangle eta law is kernel checked', () => check([], triangleEtaProof, triangleEtaType));
