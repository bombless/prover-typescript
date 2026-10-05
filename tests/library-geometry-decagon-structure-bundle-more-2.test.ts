import test from 'node:test'; import { check } from '../src/kernel/typecheck'; import * as g from '../src/library/geometry-decagon-structure-bundle-more-2';
test('decagon structure bundles are kernel checked',()=>{for(const k of ['firstVertex','tail']) check([], (g as any)[k+'Proof'], (g as any)[k+'Type']);});
