import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { rotateEtaProof, rotateEtaType } from '../src/library/geometry-rotations';

test('rotation eta law is kernel checked', () => check([], rotateEtaProof, rotateEtaType));
