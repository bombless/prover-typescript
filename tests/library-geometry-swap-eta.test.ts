import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { swapEtaProof, swapEtaType } from '../src/library/geometry-projections';

test('swapped point eta law is kernel checked', () => check([], swapEtaProof, swapEtaType));
