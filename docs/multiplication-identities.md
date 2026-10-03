# Multiplication identities

`src/library/mul-identities.ts` exports checked Core proofs of the zero and unit laws for multiplication on either side. The pairs `zeroMulType` / `zeroMulProof`, `mulZeroType` / `mulZeroProof`, `oneMulType` / `oneMulProof`, and `mulOneType` / `mulOneProof` each quantify over an arbitrary natural number.

Use `zeroMul(n)`, `mulZero(n)`, `oneMul(n)`, or `mulOne(n)` to construct an application in the caller's local context. These builders return proof terms; call the Kernel's `check` with that context and the intended equality to validate them. They do not validate an argument while constructing it.

The proofs use existing `NatRec`, the addition right-identity theorem, and equality congruence. They introduce no axioms or Kernel rules. In particular, right-zero and right-unit multiplication need induction for an open natural argument; evaluating a collection of numeral examples does not establish these universal laws.
