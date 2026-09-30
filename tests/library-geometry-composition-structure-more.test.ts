import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { transformedFstProof, transformedFstType, transformedSndProof, transformedSndType, transformedEtaProof, transformedEtaType } from '../src/library/geometry-composition-structure-more';

test('long transformation first projection is kernel checked', () => check([], transformedFstProof, transformedFstType));
test('long transformation second projection is kernel checked', () => check([], transformedSndProof, transformedSndType));
test('long transformation eta reconstruction is kernel checked', () => check([], transformedEtaProof, transformedEtaType));
