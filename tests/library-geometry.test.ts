import assert from 'node:assert/strict';
import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { Type } from '../src/syntax/ast';
import { Point, OnLine, Parallel, Perpendicular, Collinear, CommonPoint, UniqueIntersection } from '../src/library/geometry';

test('geometry vocabulary is made of ordinary Core types', () => {
  for (const relation of [Point, OnLine, Parallel, Perpendicular, Collinear, CommonPoint, UniqueIntersection]) check([], relation, Type);
});
