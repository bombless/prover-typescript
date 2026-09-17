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

test("flat parenthesis groups stay inline", () => {
  const result = text(renderBracketedExpression("f (x + y) z"));
  assert.equal(result, `f (x + y) z`);
});

test("a nested group becomes a block while its flat child stays inline", () => {
  const result = text(renderBracketedExpression("f (g (x)) z"));
  assert.equal(result, `f\n(\n  g (x)\n)\nz\n`);
});

test("nested groups recursively apply the same rule", () => {
  const result = text(renderBracketedExpression("f (g (x + y) z) q"));
  assert.equal(result, `f\n(\n  g (x + y) z\n)\nq\n`);
});

test("multiple flat groups stay on the same line", () => {
  const result = text(renderBracketedExpression("f (x) (y) z"));
  assert.equal(result, `f (x) (y) z`);
});

test("deep nesting preserves the per-group line rules", () => {
  const result = text(renderBracketedExpression("f (a (b (c)))"));
  assert.equal(result, `f\n(\n  a\n  (\n    b (c)\n  )\n)\n`);
});

test("a source consisting of one flat parenthesis group is one line", () => {
  const result = text(renderBracketedExpression("(x + y)"));
  assert.equal(result, `(x + y)`);
});

test("large Eq proof expression keeps every parenthesis group formatted recursively", () => {
  const source = `( x : Nat ) -> ( x : Nat ) -> Eq Nat ( ( ( fun x : Nat => ( fun x : Nat => ( Nat.rec ( fun x : Nat => Nat ) n ( fun x : Nat => ( fun x : Nat => ( Succ n ) ) ) ih ) ) ) ih ) ( Succ n ) ) ( Succ ( ( ( fun x : Nat => ( fun x : Nat => ( Nat.rec ( fun x : Nat => Nat ) n ( fun x : Nat => ( fun x : Nat => ( Succ n ) ) ) ih ) ) ) n ) ) )`;
  const result = text(renderBracketedExpression(source));

  assert.equal(result, `( x : Nat ) -> ( x : Nat ) -> Eq Nat\n(\n  (\n    (\n      fun x : Nat =>\n      (\n        fun x : Nat =>\n        (\n          Nat.rec ( fun x : Nat => Nat ) n\n          (\n            fun x : Nat =>\n            (\n              fun x : Nat => ( Succ n )\n            )\n          )\n          ih\n        )\n      )\n    )\n    ih\n  ) ( Succ n )\n)\n(\n  Succ\n  (\n    (\n      (\n        fun x : Nat =>\n        (\n          fun x : Nat =>\n          (\n            Nat.rec ( fun x : Nat => Nat ) n\n            (\n              fun x : Nat =>\n              (\n                fun x : Nat => ( Succ n )\n              )\n            )\n            ih\n          )\n        )\n      )\n      n\n    )\n  )\n)\n`);
});
