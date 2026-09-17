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
  assert.equal(result, `f\n(x + y)\nz`);
});

test("nested group keeps outer opener inline but puts its body after a newline", () => {
  const result = text(renderBracketedExpression("f (g (x)) z"));
  assert.equal(result, `f\n(\n  g\n  (x)\n)\nz\n`);
});

test("nested groups recursively apply the same rule", () => {
  const result = text(renderBracketedExpression("f (g (x + y) z) q"));
  assert.equal(result, `f\n(\n  g\n  (x + y)\n  z\n)\nq\n`);
});

test("multiple flat groups are expanded independently", () => {
  const result = text(renderBracketedExpression("f (x) (y) z"));
  assert.equal(result, `f\n(x)\n(y)\nz\n`);
});

test("deep nesting preserves the per-group line rules", () => {
  const result = text(renderBracketedExpression("f (a (b (c)))"));
  assert.equal(result, `f\n(\n  a\n  (\n    b\n    (c)\n  )\n)\n`);
});

test("large Eq proof expression keeps every parenthesis group formatted recursively", () => {
  const source = `( x : Nat ) -> ( x : Nat ) -> Eq Nat ( ( ( fun x : Nat => ( fun x : Nat => ( Nat.rec ( fun x : Nat => Nat ) n ( fun x : Nat => ( fun x : Nat => ( Succ n ) ) ) ih ) ) ) ih ) ( Succ n ) ) ( Succ ( ( ( fun x : Nat => ( fun x : Nat => ( Nat.rec ( fun x : Nat => Nat ) n ( fun x : Nat => ( fun x : Nat => ( Succ n ) ) ) ih ) ) ) n ) ) )`;
  const result = text(renderBracketedExpression(source));

  assert.equal(result, `( x : Nat )\n->\n( x : Nat )\n-> Eq Nat\n(\n  (\n    (\n      fun x : Nat =>\n      (\n        fun x : Nat =>\n        (\n          Nat.rec\n          ( fun x : Nat => Nat )\n          n\n          (\n            fun x : Nat =>\n            (\n              fun x : Nat =>\n              ( Succ n )\n            )\n          )\n          ih\n        )\n      )\n    )\n    ih\n  )\n  ( Succ n )\n)\n(\n  Succ\n  (\n    (\n      (\n        fun x : Nat =>\n        (\n          fun x : Nat =>\n          (\n            Nat.rec\n            ( fun x : Nat => Nat )\n            n\n            (\n              fun x : Nat =>\n              (\n                fun x : Nat =>\n                ( Succ n )\n              )\n            )\n            ih\n          )\n        )\n      )\n      n\n    )\n  )\n)\n`);
});
