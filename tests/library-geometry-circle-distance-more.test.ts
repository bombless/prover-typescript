import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { zeroRadiusMembershipProof,zeroRadiusMembershipType,originDistanceCertificateProof,originDistanceCertificateType,concreteCircleProjectionProof,concreteCircleProjectionType } from '../src/library/geometry-circle-distance-more';
test('zero-radius membership reduces to zero distance',()=>check([],zeroRadiusMembershipProof,zeroRadiusMembershipType));
test('origin distance certificate checks',()=>check([],originDistanceCertificateProof,originDistanceCertificateType));
test('concrete circle projections reconstruct the circle',()=>check([],concreteCircleProjectionProof,concreteCircleProjectionType));
