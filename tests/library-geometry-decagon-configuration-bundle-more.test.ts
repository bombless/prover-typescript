import test from 'node:test'; import { check } from '../src/kernel/typecheck'; import * as g from '../src/library/geometry-decagon-configuration-bundle-more';
test('decagon configuration certificates are kernel checked',()=>{for(const k of ['a','b','c','e','f','g','h','i','j','midpoint','jNorm','jCircle']) check([], (g as any)[k+'Proof'], (g as any)[k+'Type']);});
