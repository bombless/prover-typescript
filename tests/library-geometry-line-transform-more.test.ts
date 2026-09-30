import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { translatedVerticalProof, translatedVerticalType, rotatedVerticalProof, rotatedVerticalType, translatedIncidenceProof, translatedIncidenceType, rotatedLineProjectionProof, rotatedLineProjectionType } from '../src/library/geometry-line-transform-more';

test('translated point feeds vertical-line predicate', () => check([], translatedVerticalProof, translatedVerticalType));
test('rotated point feeds vertical-line predicate', () => check([], rotatedVerticalProof, rotatedVerticalType));
test('translated point feeds incidence predicate', () => check([], translatedIncidenceProof, translatedIncidenceType));
test('rotated line projection computes', () => check([], rotatedLineProjectionProof, rotatedLineProjectionType));
