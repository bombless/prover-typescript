import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { circleEtaProof, circleEtaType } from '../src/library/geometry-circle';

test('circle eta law is kernel checked', () => check([], circleEtaProof, circleEtaType));
