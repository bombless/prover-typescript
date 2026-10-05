import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as n from '../src/library/nat-concrete-more-9';
test('deeper closed arithmetic certificates are kernel checked', () => {
  for (const k of ['add','mul','pow','pred','sub','mixed','nested','underflow','successor']) {
    check([], (n as any)[k+'Proof'], (n as any)[k+'Type']);
  }
});
