import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { crossEtaProof, crossEtaType } from '../src/library/geometry-cross';

test('cross scalar eta law is kernel checked', () => check([], crossEtaProof, crossEtaType));
