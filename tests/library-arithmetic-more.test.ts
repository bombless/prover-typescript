import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { addSuccTripleProof, addSuccTripleType } from '../src/library/nat-theorems';
import { mulSuccQuadProof, mulSuccQuadType } from '../src/library/mul-succ';
import { powSuccQuadProof, powSuccQuadType } from '../src/library/pow-succ';
import { predSuccQuadProof, predSuccQuadType } from '../src/library/pred';
import { subFourProof, subFourType } from '../src/library/sub-theorems';

test('additional arithmetic unfolding laws are kernel checked', () => {
  check([], addSuccTripleProof, addSuccTripleType);
  check([], mulSuccQuadProof, mulSuccQuadType);
  check([], powSuccQuadProof, powSuccQuadType);
  check([], predSuccQuadProof, predSuccQuadType);
  check([], subFourProof, subFourType);
});
