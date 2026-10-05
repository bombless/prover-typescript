import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as n from '../src/library/nat-multiplication-parametric-laws-more-2';

test('additional multiplication unfolding laws are kernel checked', () => {
  check([], n.mulZeroLeftProof, n.mulZeroLeftType);
  check([], n.mulTripleSuccessorLeftProof, n.mulTripleSuccessorLeftType);
});
