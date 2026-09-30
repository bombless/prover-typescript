import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { originIncidenceProof, originIncidenceType } from '../src/library/geometry-incidence';

test('origin line incidence is kernel checked', () => check([], originIncidenceProof, originIncidenceType));
