import test from 'node:test'; import { check } from '../src/kernel/typecheck'; import * as n from '../src/library/nat-predicate-more-laws-3';
test('further natural predicate laws are kernel checked',()=>{for(const k of ['isZeroSuccSeven','isZeroSuccEight','parityNine','parityTen','parityEleven','parityTwelve']) check([], (n as any)[k+'Proof'], (n as any)[k+'Type']);});
