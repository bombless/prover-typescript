import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { concreteCircleEtaProof, concreteCircleEtaType } from '../src/library/geometry-circle-laws';
test('concrete circle eta reconstruction is kernel checked', () => check([], concreteCircleEtaProof, concreteCircleEtaType));
