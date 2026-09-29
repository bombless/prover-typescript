# Checked definition annotations

Definitions may include an expected type:

```text
def zero : Nat := 0
def id : (A : Type) -> (x : A) -> A := (A : Type) => (x : A) => x
```

The REPL checks that the annotation is a type and the value has that type before storing the definition. An unknown name, type mismatch, or duplicate definition leaves the environment unchanged. An annotation can use an earlier definition, including an alias for a type.

The existing `def name := term` form continues to infer its type automatically. The theorem declaration syntax is unchanged.
