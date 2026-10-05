import test from 'node:test'; import { check } from '../src/kernel/typecheck'; import * as g from '../src/library/geometry-quadrilateral-full-configuration-more-3';
test('full quadrilateral configuration is kernel checked', () => { for (const k of ['a','b','c','e','mAC','mBD','aNorm','abDot','acCross','eCircle','bVertical']) check([], (g as any)[k+'Proof'], (g as any)[k+'Type']); });
