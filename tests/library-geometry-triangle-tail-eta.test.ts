import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { triangleTailEtaProof, triangleTailEtaType } from '../src/library/geometry-triangle';

test('triangle tail eta law is kernel checked', () => check([], triangleTailEtaProof, triangleTailEtaType));
