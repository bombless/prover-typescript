import test from 'node:test'; import { check } from '../src/kernel/typecheck'; import * as g from '../src/library/geometry-twelve-point-configuration-bundle-more';
test('twelve point configuration certificates are kernel checked',()=>{for(const x of ['a','b','c','e','f','g','h','i','j','k','l','m','midpoint','mNorm','mCircle']) check([], (g as any)[x+'Proof'], (g as any)[x+'Type']);});
