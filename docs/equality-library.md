# Reusable equality proofs

`src/library/equality.ts` provides closed polymorphic Core proofs and application builders for:

- `equalitySymmetry(A, a, b, h)` — turn `h : Eq A a b` into `Eq A b a`.
- `equalityTransitivity(A, a, b, c, ab, bc)` — compose two equality witnesses.
- `equalityCongruence(A, B, f, a, b, h)` — lift equality through a non-dependent `f : A -> B`.

Each corresponding `...Proof` and `...Type` export can also be used directly. These ordinary terms are proved using `EqRec`, without axioms or new Kernel rules.

```ts
const evidence = refl(Nat, Zero);
const lifted = equalityCongruence(
  Nat, Nat, lambda(Nat, succ(variable(0))), Zero, Zero, evidence,
);
check([], lifted, eq(Nat, succ(Zero), succ(Zero)));
```

Builders only assemble explicit Core applications, like `addTerm` and `mulTerm`; callers check the resulting term in their local context. Incorrect endpoints, evidence or function types remain Kernel errors. Congruence here is non-dependent: dependent transports use `EqRec` directly. These exports do not register browser or REPL aliases.
