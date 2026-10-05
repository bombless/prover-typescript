import test from 'node:test'; import { check } from '../src/kernel/typecheck'; import * as g from '../src/library/geometry-pentagon-configuration-bundle-more-2';
test('pentagon configuration certificates are kernel checked', () => { for (const k of ['a','b','c','e','f','midpoint','aNorm','abDot','acCross','fCircle']) check([], (g as any)[k+'Proof'], (g as any)[k+'Type']); });
