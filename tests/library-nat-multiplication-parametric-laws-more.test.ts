import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { mulSuccessorLeftType, mulSuccessorLeftProof, mulDoubleSuccessorLeftType, mulDoubleSuccessorLeftProof } from '../src/library/nat-multiplication-parametric-laws-more';

test('multiplication successor left law', () => check([], mulSuccessorLeftProof, mulSuccessorLeftType));
test('multiplication double successor left law', () => check([], mulDoubleSuccessorLeftProof, mulDoubleSuccessorLeftType));
