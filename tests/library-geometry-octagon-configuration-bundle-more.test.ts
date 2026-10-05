import test from 'node:test'; import { check } from '../src/kernel/typecheck'; import * as g from '../src/library/geometry-octagon-configuration-bundle-more';
test('octagon configuration certificates are kernel checked',()=>{for(const k of ['a','b','c','e','f','g','h','i','midpoint','iNorm','iCircle']) check([], (g as any)[k+'Proof'], (g as any)[k+'Type']);});
