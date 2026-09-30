import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-triangle-transform-vector-relation-certificates-more';

test('transformed triangle vertex A', () => check([], c.taProof, c.taType));
test('transformed triangle vertex B', () => check([], c.tbProof, c.tbType));
test('transformed triangle vertex dot', () => check([], c.dotProof, c.dotType));
test('transformed triangle vertex cross', () => check([], c.crossProof, c.crossType));
test('transformed triangle vertex norm', () => check([], c.normProof, c.normType));
