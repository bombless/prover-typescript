import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-four-point-composite-certificates-more';

test('four point A transform', () => check([], c.aProof, c.aType));
test('four point B transform', () => check([], c.bProof, c.bType));
test('four point C transform', () => check([], c.cProof, c.cType));
test('four point D transform', () => check([], c.dProof, c.dType));
test('four point A norm', () => check([], c.aNormProof, c.aNormType));
