import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { triangleConcreteFirstVertexProof, triangleConcreteFirstVertexType } from '../src/library/geometry-triangle';
test('concrete triangle vertex projection is kernel checked', () => check([], triangleConcreteFirstVertexProof, triangleConcreteFirstVertexType));
