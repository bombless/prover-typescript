import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { lineEtaProof, lineEtaType } from '../src/library/geometry-line';

test('line eta law is kernel checked', () => check([], lineEtaProof, lineEtaType));
