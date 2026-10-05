import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-circle-transform-composition-certificates-more';

test('composite circle center law', () => check([], c.compositeCircleCenterProof, c.compositeCircleCenterType));
test('composite circle radius law', () => check([], c.compositeCircleRadiusProof, c.compositeCircleRadiusType));
test('composite circle eta law', () => check([], c.compositeCircleEtaProof, c.compositeCircleEtaType));
test('concrete translate then rotate center', () => check([], c.compositeCircleConcreteProof, c.compositeCircleConcreteType));
