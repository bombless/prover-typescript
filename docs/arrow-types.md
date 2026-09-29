# Function type shorthand

Use `Nat -> Nat` for a function from natural numbers to natural numbers. Arrows associate to the right, so `Nat -> Nat -> Nat` accepts two arguments. Parenthesize a function-valued argument: `(Nat -> Nat) -> Nat`.

Application binds more tightly than arrows. Named dependent binders keep their existing syntax, and can be mixed with the shorthand: `(A : Type) -> A -> A`.

The shorthand introduces no source-level binding. An existing local named `_` remains visible in `(_ : Type) -> Nat -> _`. Lambda terms still require explicit typed binders such as `(x : Nat) => x`.
