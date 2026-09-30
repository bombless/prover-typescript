import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { concreteMembershipProof, concreteMembershipType, translatedMembershipProof, translatedMembershipType, rotatedMembershipProof, rotatedMembershipType } from '../src/library/geometry-circle-more';

test('concrete circle membership computes', () => check([], concreteMembershipProof, concreteMembershipType));
test('translated circle membership computes', () => check([], translatedMembershipProof, translatedMembershipType));
test('rotated circle membership computes', () => check([], rotatedMembershipProof, rotatedMembershipType));
