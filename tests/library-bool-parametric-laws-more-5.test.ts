import test from 'node:test'; import { check } from '../src/kernel/typecheck'; import * as b from '../src/library/bool-parametric-laws-more-5';
test('more parametric Boolean laws are kernel checked',()=>{check([],b.notNotProof,b.notNotType);check([],b.notAndTrueProof,b.notAndTrueType);check([],b.notOrFalseProof,b.notOrFalseType);});
