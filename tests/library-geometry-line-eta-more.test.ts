import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { lineConcreteEtaProof, lineConcreteEtaType } from '../src/library/geometry-line';
test('concrete line eta reconstruction is kernel checked', () => check([], lineConcreteEtaProof, lineConcreteEtaType));
