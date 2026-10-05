import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as n from '../src/library/nat-power-parametric-laws-more-2';
test('additional power laws are kernel checked', () => { check([], n.powZeroProof, n.powZeroType); check([], n.powSuccParametricProof, n.powSuccParametricType); });
