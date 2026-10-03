# Multiplication distributivity

`src/library/mul-distributivity.ts` exports `addMulType` / `addMulProof` for `(a + b) * c = a * c + b * c`, and `mulAddType` / `mulAddProof` for `a * (b + c) = a * b + a * c`. Each theorem quantifies over three arbitrary natural numbers.

`addMul(a, b, c)` and `mulAdd(a, b, c)` build applications in the caller's context. The Kernel must still check the returned proof against the intended equality. Builders construct syntax and do not validate their arguments eagerly.

Both proofs use natural induction with motives that quantify over the remaining arguments. Their successor cases reuse checked addition associativity, addition commutativity, and generic equality transport. The second direction rearranges four summands through those addition theorems. No arithmetic axioms, multiplication commutativity assumption, Kernel rules, or frontend aliases are added.
