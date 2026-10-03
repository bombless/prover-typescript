# Parser nesting limit

The source parser reports `ParseError` with a token position when nested syntax
would exceed 256 active term/atom parsing calls. This covers parenthesized
expressions, constructor prefixes, dependent binders, and function arrows.
The counter is restored as each call returns, so separate application arguments
do not consume a cumulative nesting budget. Ordinary proof terms remain valid.

For example, generated input containing thousands of nested parentheses or
`Succ` prefixes receives a syntax error instead of a JavaScript stack overflow.
This limit protects recursive source parsing. It does not bound tokenization,
flat applications, decimal numeral expansion, elaboration, or evaluation.
