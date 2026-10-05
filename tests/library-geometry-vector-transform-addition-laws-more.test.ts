import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-vector-transform-addition-laws-more';

test('rotation distributes over vector addition', () => check([], c.rotateAddProof, c.rotateAddType));
test('reflection distributes over vector addition', () => check([], c.reflectAddProof, c.reflectAddType));
test('concrete rotated vector sum', () => check([], c.rotateAddConcreteProof, c.rotateAddConcreteType));
test('concrete reflected vector sum', () => check([], c.reflectAddConcreteProof, c.reflectAddConcreteType));
