import test from "node:test";
import assert from "node:assert/strict";

import { renderBracketedExpression } from "../src/ui/bracket-renderer.js";

function text(html: string): string {
  return html
    .replace(/<br\s*\/?>/g, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

test("flat parenthesis group is expanded onto separate lines", () => {
  const result = text(renderBracketedExpression("f (x + y) z"));
  assert.equal(result, `f
(x + y)
z`);
});

test("nested group keeps outer opener inline but puts its body after a newline", () => {
  const result = text(renderBracketedExpression("f (g (x)) z"));
  assert.equal(result, `f
  (
    g
    (x)
  )
`
);
});

test("nested groups recursively apply the same rule", () => {
  const result = text(renderBracketedExpression("f (g (x + y) z) q"));
  assert.equal(result, `f
  (
    g
    (x + y)
    z
  )
`);
});

test("multiple flat groups are expanded independently", () => {
  const result = text(renderBracketedExpression("f (x) (y) z"));
  assert.equal(result, `f
(x)
(y)
z`);
});

test("deep nesting preserves the per-group line rules", () => {
  const result = text(renderBracketedExpression("f (a (b (c)))"));
  assert.equal(result, `f
  (
    a
      (
        b
        (c)
      )
  )
`);
});

test("large Eq proof expression keeps every parenthesis group formatted recursively", () => {
  const source = `( x : Nat ) -> ( x : Nat ) -> Eq Nat ( ( ( fun x : Nat => ( fun x : Nat => ( Nat.rec ( fun x : Nat => Nat ) #0 ( fun x : Nat => ( fun x : Nat => ( Succ #0 ) ) ) #1 ) ) ) #1 ) ( Succ #0 ) ) ( Succ ( ( ( fun x : Nat => ( fun x : Nat => ( Nat.rec ( fun x : Nat => Nat ) #0 ( fun x : Nat => ( fun x : Nat => ( Succ #0 ) ) ) #1 ) ) ) #1 ) #0 ) )`;
  const result = text(renderBracketedExpression(source));

  assert.equal(result, `( x : Nat )
->
( x : Nat )
-> Eq Nat
(
  (
    (
      fun x : Nat =>
      (
        fun x : Nat =>
        (
          Nat.rec
          ( fun x : Nat => Nat )
          #0
          (
            fun x : Nat =>
            (
              fun x : Nat =>
              ( Succ #0 )
            )
          )
          #1
        )
      )
    )
    #1
  )
  ( Succ #0 )
)
(
  Succ
  (
    (
      (
        fun x : Nat =>
        (
          fun x : Nat =>
          (
            Nat.rec
            ( fun x : Nat => Nat )
            #0
            (
              fun x : Nat =>
              (
                fun x : Nat =>
                ( Succ #0 )
              )
            )
            #1
          )
        )
      )
      #1
    )
    #0
  )
)
`);
});