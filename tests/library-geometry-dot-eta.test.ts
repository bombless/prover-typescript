import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { dotEtaProof, dotEtaType } from '../src/library/geometry-metrics';

test('dot scalar eta law is kernel checked', () => check([], dotEtaProof, dotEtaType));
