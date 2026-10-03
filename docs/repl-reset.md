# Reset session definitions

Enter `#reset` to remove all stored definitions and theorem proofs from the
current REPL session. The command reports `Session definitions cleared.` and
names may then be defined again without restarting the process:

```text
def n := 0
#reset
def n := 1
```

The built-in syntax and other environment instances are unaffected. The command
has no arguments and stores no files. `reset` without `#` remains an ordinary
identifier. Resetting an empty session succeeds.

Custom `Environment` implementations may provide `clear(): void`. If that method
is absent, the command raises `EnvironmentError`; if it throws, its error
propagates without a success message. A custom implementation is responsible
for its own mutation and rollback behavior.
