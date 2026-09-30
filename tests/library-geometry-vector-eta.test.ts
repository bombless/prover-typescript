import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { vectorEtaProof, vectorEtaType } from '../src/library/geometry-vectors';

test('vector eta law is kernel checked', () => check([], vectorEtaProof, vectorEtaType));
