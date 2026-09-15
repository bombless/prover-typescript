# prover-typescript

A tiny Curry–Howard proof assistant kernel written in TypeScript.

## Milestone 1 — de Bruijn Kernel

Milestone 1 is complete. The trusted core uses one consistent invariant: `Var(index)` is a de Bruijn index, with `#0` referring to the innermost enclosing binder, `#1` to the next outer binder, and so on. Substitution shifts replacements when crossing binders, and beta reduction therefore remains capture-avoiding.

The `Nat.rec` successor case is checked with the same binder convention: inside `((n : Nat) -> P n -> P (Succ n))`, `#0` is the induction hypothesis and `#1` is `n`. `add` recurses on its first argument, so its closed computations satisfy `add 0 3 -> 3`, `add 1 3 -> 4`, and `add 2 3 -> 5` by normalization.

Annotated lambdas are inferable as `Pi` types, which makes the kernel-level contract `infer(add) = Nat -> Nat -> Nat` explicit while preserving kernel checking as the trust boundary.

The current implementation deliberately keeps the trusted core small. It currently contains:

- `Type` and `Nat`
- `Zero` and `Succ`
- de Bruijn-indexed variables
- dependent function types (`Pi`)
- lambda terms and application
- capture-avoiding substitution
- beta reduction and normalization
- `Nat.rec` with iota reduction
- equality propositions (`Eq`), reflexivity (`Refl`), and dependent equality elimination (`EqRec`)
- kernel `infer` / `check`
- definitional equality
- a small recursive `add` library
- regression tests

The architecture intentionally separates syntax, reduction, type checking, and library definitions. Tactics and surface syntax are not trusted by the kernel and will be added later.

## Milestone 2 — Nat.rec

Milestone 2 is complete. `NatRec(motive, zeroCase, succCase, scrutinee)` keeps this argument order unchanged and uses the dependent eliminator:

```text
Nat.rec :
  (P : Nat -> Type) ->
  P 0 ->
  ((n : Nat) -> P n -> P (Succ n)) ->
  (n : Nat) ->
  P n
```

The successor case is checked as `λn. λih. ...`: inside the nested binders, `#0` is the induction hypothesis and `#1` is `n`. The kernel therefore checks the dependent result `P (Succ n)` rather than treating the recursive step as a special arithmetic operation.

Reduction is fixed by the two iota rules:

```text
Nat.rec P z s 0        -> z
Nat.rec P z s (Succ n) -> s n (Nat.rec P z s n)
```

The regression suite in `tests/kernel/nat-rec.test.ts` covers both rules, concrete recursion, symbolic successor recursion, a genuinely dependent motive, and rejection of the wrong de Bruijn binder reference. Existing `add` behavior and the `add n 0` non-reduction regression remain unchanged.

Implementation decision: no new kernel workaround was needed for Milestone 2. The existing `shift`, capture-avoiding `substitute`, `NatRec` iota reduction, and `NatRec` type checking already implement the intended semantics; this milestone makes those semantics explicit and regression-tested. The npm test glob now includes all files under `tests/kernel` so these regressions cannot be silently skipped.

## Milestone 3 — add

Milestone 3 is complete. `add` is defined by recursion on its first argument:

```text
add 0 m = m
add (Succ n) m = Succ (add n m)
```

Its Core AST is explicitly:

```text
add =
  λn : Nat =>
  λm : Nat =>
    Nat.rec
      (λ_ : Nat => Nat)
      m
      (λn =>
        λih =>
          Succ ih)
      n
```

The motive is `λ_ : Nat => Nat`. In the successor case `λn. λih. Succ ih`, the de Bruijn convention is `#0 = ih` and `#1 = n`, so the body is `Succ(Var(0))`. The library definition therefore matches the general `Nat.rec` semantics rather than receiving any special arithmetic treatment in the kernel.

The kernel verifies `infer(add) = Nat -> Nat -> Nat`, and `check([], add, addType)` succeeds. Concrete normalization is regression-tested for `add 0 3 = 3`, `add 1 3 = 4`, `add 2 3 = 5`, and `add 3 4 = 7`.

The symbolic regression is also explicit: for `n : Nat`, `add n 0` remains a neutral `Nat.rec` computation because the scrutinee `n` is unknown. Therefore it is not definitionally equal to `n`, while `infer(n : Nat, add n 0) = Nat` still succeeds. This behavior is intentionally preserved for the later definitional-equality milestone.

Implementation decision: Milestone 3 required no kernel semantic changes or `add`-specific reduction workaround. The existing beta reduction, capture-avoiding substitution, `Nat.rec` iota rules, normalization, and dependent type checking are sufficient. New coverage lives in `tests/kernel/add.test.ts`, including an exact Core AST regression, type checking, closed computations, and the unknown-variable case.

## Milestone 4 — Definitional Equality

Milestone 4 is complete. Definitional equality is the equality obtained directly from the kernel's computation rules rather than from a separate theorem proving layer. The current kernel normalizes terms and then compares the resulting Core terms structurally.

The relevant computation rules are:

```text
(λx. body) arg
  -> body[x := arg]

Nat.rec P z s 0
  -> z

Nat.rec P z s (Succ n)
  -> s n (Nat.rec P z s n)

Eq.rec motive reflCase a a refl
  -> reflCase
```

Beta reduction uses the existing capture-avoiding `substitute` and `shift` implementation, preserving the invariant that `#0` is the nearest binder. `Nat.rec` performs iota reduction only when its scrutinee is visibly `Zero` or `Succ`; an unknown variable is neutral and is never reduced speculatively.

This distinction is visible in the arithmetic library. Closed computation is definitional:

```text
add 2 3 ≡ 5
```

because `add` unfolds through beta reduction and its `Nat.rec` scrutinee becomes concrete successors until the numeral is reached. In contrast, for `n : Nat`,

```text
add n 0
```

first beta-reduces to a `Nat.rec` whose scrutinee is the unknown variable `n`. The kernel therefore keeps that neutral computation instead of inventing the mathematical theorem `add n 0 = n`. Consequently:

```text
!definitionalEqual(add n 0, n)
infer(n : Nat, add n 0) = Nat
```

This is the intended boundary between computation and propositional equality: `add 2 3 ≡ 5` is computation, while a future theorem such as `add_zero` will require an equality proof.

Implementation decision: no kernel semantic change was required for Milestone 4. The existing generic beta reduction, `Nat.rec` iota rules, `Eq.rec` reduction, normalization, `whnf`, substitution/shift, and structural comparison already express the intended semantics. Milestone 4 therefore adds focused regression coverage rather than arithmetic-specific kernel rules. The regression suite covers beta reduction, nested beta, both `Nat.rec` iota cases, closed addition, neutral `Nat.rec`, unknown `add n 0`, normalization behavior, and definitional equality of normalized dependent types.

## Milestone 5 — Eq

Milestone 5 is complete. Equality is now a real Core / Kernel feature rather than a theorem-specific convention. The Core representation uses de Bruijn-compatible constructors:

```text
Eq(A, a, b)       : Type
Refl(A, a)         : Eq A a a
EqRec(P, r, a, b, p) : P b
```

`Eq` checks its carrier type and both endpoints:

```text
A : Type
 a : A
 b : A
----------------
Eq A a b : Type
```

`Refl` is typed directly from its value:

```text
Refl a : Eq A a a
```

The equality eliminator uses the dependent motive:

```text
P : (x : A) -> Type
r : P a
p : Eq A a b
----------------
Eq.rec P r a b p : P b
```

Its computational rule is the usual equality iota rule:

```text
Eq.rec P r a a (Refl a) ≡ r
```

The kernel type checker now validates the motive over the *type* of the eliminated value, rather than accidentally treating the value itself as a Pi domain. The eliminator then checks the right endpoint and equality proof against that same carrier type before producing `P b`.

The regression suite in `tests/kernel/eq.test.ts` covers the `Eq` proposition type, `Refl` typing, `EqRec` typing, reduction on `Refl`, genuinely dependent motives, and rejection of ill-typed equality data. The full suite grows from 35 to 43 passing tests.

This milestone also makes the distinction between the two notions of equality explicit:

- **Definitional equality** is computation performed by the kernel, such as beta reduction, `Nat.rec` iota reduction, and `Eq.rec` reduction on `Refl`.
- **Propositional equality** is a term of type `Eq A a b`, such as `Refl` or a future theorem proof. It is not accepted merely because two arbitrary terms look mathematically equal.

Implementation decisions:

1. No new named-variable representation was introduced; the existing Core AST remains de Bruijn-based.
2. The existing `Eq`, `Refl`, and `EqRec` AST nodes were retained because they already express the required type theory directly.
3. The existing `Eq.rec` reduction rule was retained; no theorem-specific equality shortcut was added.
4. The only Kernel semantic fix required was to type the `EqRec` motive as `(x : A) -> Type`, where `A` is inferred from the left endpoint.
5. No arithmetic-specific rule, tactic, automation, or theorem workaround was introduced. Equality proofs remain ordinary terms checked by `kernel.check`.

## Milestone 6 — First Mathematical Proof

Milestone 6 is complete. The first mathematical theorem is now an explicit Core proof term:

```text
add_zero :
  (n : Nat) ->
  Eq Nat (add n 0) n
```

The proof is ordinary Core syntax; there is no theorem declaration framework, parser, tactic, or arithmetic-specific kernel rule.

The induction structure is generated directly by `Nat.rec` with the motive:

```text
P(x) = Eq Nat (add x 0) x
```

The base case is simply:

```text
Refl 0
```

because `add 0 0` reduces definitionally to `0`.

The successor case is `λn. λih. ...`, with `#0 = ih` and `#1 = n`. Its induction hypothesis is:

```text
ih : Eq Nat (add n 0) n
```

The proof transports reflexivity through that hypothesis using `Eq.rec`. The local dependent motive is:

```text
Q(x) = Eq Nat (Succ (add n 0)) (Succ x)
```

so:

```text
Q(add n 0)
```

is proved by:

```text
Refl (Succ (add n 0))
```

and `Eq.rec` transports it along `ih` to `Q(n)`. The resulting equality is exactly the successor goal because the existing definitional computation gives:

```text
add (Succ n) 0 ≡ Succ (add n 0)
```

This is deliberately not a new arithmetic reduction rule. In particular, the symbolic computation remains neutral:

```text
n : Nat
!definitionalEqual(add n 0, n)
```

The theorem therefore demonstrates the intended Curry–Howard boundary: computation proves the closed base reduction, while propositional equality and `Eq.rec` prove the general theorem.

### Kernel integrity and implementation decision

The proof is accepted only through the existing `infer` / `check` machinery. No theorem-specific acceptance path was added, and no arithmetic-specific definitional equality was introduced.

One small generic Kernel correction was necessary: variable lookup now shifts a dependent context entry by `index + 1` when returning its type. Context entries are stored relative to the context in which their binders were introduced, so this shift is required when a dependent hypothesis is referenced under additional inner binders. The change uses the existing generic `shift` operation and fixes dependent binder lookup rather than adding any `add_zero` special case.

Regression coverage was added in `tests/kernel/add-zero.test.ts` for:

1. the full `addZeroProof` type;
2. the `Refl 0` base case;
3. the successor case and actual `EqRec` node with `#0 = ih`;
4. applications to `0`, `1`, `2`, and `3`;
5. preservation of the non-definitional status of `add n 0` for an unknown `n`.

The complete regression suite now contains 48 passing tests.

## Milestone 7 — Core Library

Milestone 7 is complete. The Core arithmetic library now contains `mul` and `pow`, both expressed entirely with the existing `Nat.rec` eliminator. No Kernel semantic rule was added for either operation.

`mul` is defined by recursion on its first argument:

```text
mul 0 m = 0
mul (Succ n) m = add m (mul n m)
```

Its Core term is:

```text
mul =
  λn : Nat =>
  λm : Nat =>
    Nat.rec
      (λ_ : Nat => Nat)
      0
      (λn =>
        λih =>
          add m ih)
      n
```

The successor case follows the existing de Bruijn convention: after the two local binders, `#0` is the induction hypothesis and the outer `m` is `#2`. The Kernel therefore sees an ordinary dependent eliminator term rather than a multiplication primitive.

The Kernel verifies:

```text
mul : Nat -> Nat -> Nat
```

Closed multiplication reduces definitionally through beta reduction and `Nat.rec` iota reduction:

```text
mul 0 3 ≡ 0
mul 1 3 ≡ 3
mul 2 3 ≡ 6
mul 3 4 ≡ 12
```

For an unknown first argument, the recursion remains neutral. In particular, with `n : Nat`, `mul n 0` is not definitionally identified with `0`.

`pow` is defined by recursion on its second argument:

```text
pow n 0 = 1
pow n (Succ k) = mul n (pow n k)
```

Because the Core has only `Zero` and `Succ`, the numeral `1` is represented as `Succ Zero`. Its Core term is:

```text
pow =
  λn : Nat =>
  λk : Nat =>
    Nat.rec
      (λ_ : Nat => Nat)
      (Succ Zero)
      (λk =>
        λih =>
          mul n ih)
      k
```

The Kernel verifies:

```text
pow : Nat -> Nat -> Nat
```

Closed powers reduce definitionally:

```text
pow 2 0 ≡ 1
pow 2 1 ≡ 2
pow 2 2 ≡ 4
pow 2 3 ≡ 8
pow 3 2 ≡ 9
```

### Kernel integrity

Milestone 7 required no changes under `src/kernel/`. Both definitions are ordinary `Term` values validated through the existing `infer` / `check` boundary. There are no `mul`-specific or `pow`-specific reduction branches, theorem workarounds, or arithmetic-specific definitional equality rules.

### Regression tests

New coverage lives in:

```text
tests/kernel/mul.test.ts
tests/kernel/pow.test.ts
```

The tests check the exact `Nat.rec` Core shapes, the types `Nat -> Nat -> Nat`, closed definitional computations, and the neutral symbolic multiplication case. The complete regression suite now contains **55 passing tests**.

### Implementation decisions

1. `mul` recurses on the first argument and reuses `addTerm`.
2. `pow` recurses on the second argument and reuses `mulTerm`.
3. All numeral values are constructed from `Zero` and `Succ`.
4. Existing `shift`, `substitute`, `normalize`, `definitionalEqual`, `infer`, and `check` are sufficient; no Kernel change was needed.
5. No arithmetic theorem was added. `mul_zero`, `mul_one`, `pow_zero`, `pow_succ`, and related facts remain Milestone 8 work.

### Next milestone

```text
Milestone 8 — Arithmetic Theorems
```

Milestone 7 is intentionally complete at this point; no Milestone 8 theorem, surface syntax, elaborator, REPL, theorem declaration, proof-state machinery, or tactic automation is included yet.

## Milestone 8 — Arithmetic Theorems

Milestone 8 is complete. The arithmetic library now contains the first theorem layer as ordinary Core proof terms:

```text
zero_add
add_zero
succ_add
add_succ
add_assoc
add_comm
```

No theorem declaration syntax, tactic engine, automation, or arithmetic-specific Kernel rule was added. Every theorem is a `Term` and is accepted only through the existing `infer` / `check` boundary.

### Theorem statements

```text
zero_add :
  (n : Nat) ->
  Eq Nat (add 0 n) n

add_zero :
  (n : Nat) ->
  Eq Nat (add n 0) n

succ_add :
  (n : Nat) ->
  (m : Nat) ->
  Eq Nat (add (Succ n) m) (Succ (add n m))

add_succ :
  (n : Nat) ->
  (m : Nat) ->
  Eq Nat (add n (Succ m)) (Succ (add n m))

add_assoc :
  (a : Nat) ->
  (b : Nat) ->
  (c : Nat) ->
  Eq Nat (add (add a b) c) (add a (add b c))

add_comm :
  (a : Nat) ->
  (b : Nat) ->
  Eq Nat (add a b) (add b a)
```

### Definitional versus propositional equality

The Kernel continues to compute only through generic rules:

```text
Beta
Nat.rec iota
Eq.rec iota
```

Therefore:

```text
add 0 n ≡ n
add (Succ n) m ≡ Succ (add n m)
```

are definitional equalities. In contrast, for unknown variables:

```text
n : Nat
!definitionalEqual(add n 0, n)

n m : Nat
!definitionalEqual(add n (Succ m), Succ (add n m))
```

remain neutral. `add_zero` and `add_succ` therefore require actual proof terms rather than arithmetic-specific reduction shortcuts.

### Induction motives and `Nat.rec`

The theorem proofs use `Nat.rec` as the induction principle. For the simple reflexive theorems, the motive can reduce directly to `Refl`. For `add_succ`, `add_assoc`, and `add_comm`, the proof uses dependent motives and explicit equality transport.

A useful implementation pattern is to make the induction motive closed by returning the remaining universally quantified arguments. For example, `add_succ` uses a motive of the shape:

```text
P(n) = (m : Nat) ->
       Eq Nat (add n (Succ m)) (Succ (add n m))
```

and `add_assoc` similarly abstracts over `b` and `c`. This keeps the theorem proof terms ordinary Core terms and avoids adding any theorem-specific elaboration machinery.

### `Eq.rec` transport

`Eq.rec` is used for ordinary equality transport, not as a hidden arithmetic rule. The proofs explicitly express common mathematical operations such as:

```text
x = y
---------
Succ x = Succ y
```

and equality symmetry / composition needed by `add_comm`.

The `add_zero` proof remains unchanged from Milestone 6 and is reused by `add_comm`. `add_succ` is likewise reused by `add_comm` to finish the successor case after applying the induction hypothesis through `Succ`.

### Generic Kernel corrections

Milestone 8 exposed two generic Kernel issues that were necessary for ordinary dependent proof terms:

1. When checking a `Nat.rec` successor case, the dependent motive must be shifted across the newly introduced successor binder before forming `P(n)` and `P(Succ n)`. This is a generic dependent-context rule, not an arithmetic shortcut.
2. When inferring an application, an inferred function type is reduced to weak-head normal form before checking that it is a `Pi`. This is required when a dependent hypothesis has a Pi-valued type that is represented by a beta-redex.

Neither change recognizes `add_zero`, `add_succ`, `add_assoc`, or `add_comm` specially. No arithmetic-specific reduction branch was added.

### Regression tests

Milestone 8 adds:

```text
tests/kernel/zero-add.test.ts
tests/kernel/succ-add.test.ts
tests/kernel/add-succ.test.ts
tests/kernel/add-assoc.test.ts
tests/kernel/add-comm.test.ts
```

The tests verify theorem types, Kernel checking, inference, concrete applications, induction structure, and the symbolic definitional/propositional boundary. The complete regression suite now contains **73 passing tests**.

### Implementation decisions

1. `zero_add` and `succ_add` are direct `Refl` proofs because their endpoints compute definitionally.
2. `add_succ` uses induction on its first argument and a closed motive returning the remaining `m` argument.
3. `add_assoc` uses induction on `a` with `b` and `c` abstracted in the motive.
4. `add_comm` uses induction on `a`, reuses `add_zero` and `add_succ`, and performs the necessary equality transports with `Eq.rec`.
5. All theorem proofs are ordinary Core `Term` values.
6. No surface AST, elaborator, theorem declaration, tactic, or automation layer was introduced.
7. No theorem-specific Kernel branch or arithmetic-specific definitional equality was introduced.

## Run

```text
npm install
npm test
npm start
```

## Next milestones

1. Milestone 1 — complete (`de Bruijn` kernel);
2. Milestone 2 — complete (`Nat.rec`);
3. Milestone 3 — complete (`add` definition and regression coverage);
4. Milestone 4 — complete (definitional equality);
5. Milestone 5 — complete (`Eq` / `Refl` / `EqRec`);
6. Milestone 6 — complete (explicit `add_zero` proof term);
7. Milestone 7 — complete (`mul` / `pow` Core library);
8. **Milestone 8 — complete (arithmetic theorems);**
9. Milestone 9 — Surface AST.

Milestone 8 is intentionally complete at this point; do not advance automatically to Milestone 9.
