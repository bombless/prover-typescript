import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { nestedAddFstProof, nestedAddFstType, nestedAddConcreteProof, nestedAddConcreteType, scaleAddConcreteProof, scaleAddConcreteType, rotateNestedAddProof, rotateNestedAddType, nestedAddEtaProof, nestedAddEtaType } from '../src/library/geometry-vector-compositions';

test('nested vector addition first projection is kernel checked', () => check([], nestedAddFstProof, nestedAddFstType));
test('nested vector addition computes concretely', () => check([], nestedAddConcreteProof, nestedAddConcreteType));
test('scaling a vector sum computes concretely', () => check([], scaleAddConcreteProof, scaleAddConcreteType));
test('rotating a nested vector sum computes concretely', () => check([], rotateNestedAddProof, rotateNestedAddType));
test('nested vector addition eta is kernel checked', () => check([], nestedAddEtaProof, nestedAddEtaType));
