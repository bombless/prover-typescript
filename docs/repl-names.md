# List REPL definitions

Enter `#names` to list the definitions and theorems stored in the current REPL session, in declaration order. Each name appears on a separate line. An empty environment prints `No definitions.`. The command takes no arguments and does not print definition bodies.

The `GlobalEnvironment.names()` API returns a fresh snapshot. Custom environments may implement the optional `names()` method to support the command; their existing lookup and definition behavior does not change.
