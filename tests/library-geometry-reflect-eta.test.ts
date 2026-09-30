import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { reflectEtaProof, reflectEtaType } from '../src/library/geometry-reflections';

test('reflection eta law is kernel checked', () => check([], reflectEtaProof, reflectEtaType));
