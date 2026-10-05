import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as g from '../src/library/geometry-circle-line-configuration-more-3';

test('second circle and line configuration is kernel checked', () => {
  for (const k of ['point', 'norm', 'circle', 'vertical', 'incidence']) {
    check([], (g as any)[k + 'Proof'], (g as any)[k + 'Type']);
  }
});
