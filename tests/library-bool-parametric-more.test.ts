import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { notCaseProof, notCaseType, andRightTrueProof, andRightTrueType, orRightFalseProof, orRightFalseType, boolCaseTrueOrFalse, boolCaseTrueOrFalseType } from '../src/library/bool-parametric-more';

test('Boolean case result is kernel checked', () => check([], boolCaseTrueOrFalse, boolCaseTrueOrFalseType));
test('Boolean negation branch law is kernel checked', () => check([], notCaseProof, notCaseType));
test('Boolean conjunction right identity is kernel checked', () => check([], andRightTrueProof, andRightTrueType));
test('Boolean disjunction right identity is kernel checked', () => check([], orRightFalseProof, orRightFalseType));
