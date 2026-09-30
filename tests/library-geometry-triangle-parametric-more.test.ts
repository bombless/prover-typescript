import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { translatedFirstVertexFstProof, translatedFirstVertexFstType, translatedFirstVertexSndProof, translatedFirstVertexSndType, translatedSecondVertexProof, translatedSecondVertexType, translatedConcreteVertexProof, translatedConcreteVertexType } from '../src/library/geometry-triangle-parametric-more';

test('translated triangle first x-coordinate law is kernel checked', () => check([], translatedFirstVertexFstProof, translatedFirstVertexFstType));
test('translated triangle first y-coordinate law is kernel checked', () => check([], translatedFirstVertexSndProof, translatedFirstVertexSndType));
test('translated triangle second vertex expression is kernel checked', () => check([], translatedSecondVertexProof, translatedSecondVertexType));
test('translated concrete triangle vertex computes', () => check([], translatedConcreteVertexProof, translatedConcreteVertexType));
