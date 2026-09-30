import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { scaleSumFstProof, scaleSumFstType, scaleSumSndProof, scaleSumSndType, scaleSumConcreteProof, scaleSumConcreteType } from '../src/library/geometry-vector-compositions-more';

test('scaled vector sum first coordinate law is kernel checked', () => check([], scaleSumFstProof, scaleSumFstType));
test('scaled vector sum second coordinate law is kernel checked', () => check([], scaleSumSndProof, scaleSumSndType));
test('concrete scaled vector sum computes', () => check([], scaleSumConcreteProof, scaleSumConcreteType));
