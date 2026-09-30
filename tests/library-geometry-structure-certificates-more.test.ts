import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { circleProjectionBundleProof,circleProjectionBundleType,lineProjectionBundleProof,lineProjectionBundleType,concreteCircleMembershipProof,concreteCircleMembershipType } from '../src/library/geometry-structure-certificates-more';
test('circle center and radius bundle checks',()=>check([],circleProjectionBundleProof,circleProjectionBundleType));
test('line base and direction bundle checks',()=>check([],lineProjectionBundleProof,lineProjectionBundleType));
test('concrete circle membership computes',()=>check([],concreteCircleMembershipProof,concreteCircleMembershipType));
