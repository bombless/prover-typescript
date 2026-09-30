import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { translateEtaProof, translateEtaType } from '../src/library/geometry-transform';

test('translation output eta law is kernel checked', () => check([], translateEtaProof, translateEtaType));
