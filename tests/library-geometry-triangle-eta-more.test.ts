import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { triangleConcreteEtaProof, triangleConcreteEtaType } from '../src/library/geometry-triangle';
test('concrete triangle eta reconstruction is kernel checked', () => check([], triangleConcreteEtaProof, triangleConcreteEtaType));
