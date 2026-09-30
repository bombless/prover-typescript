import { Term, app, lambda, natRec, boolRec, emptyRec, succ, prod, pair, fst, snd } from '../syntax/ast';

export function shift(term: Term, amount: number, cutoff = 0): Term {
  switch (term.kind) {
    case 'Var': return { ...term, index: term.index >= cutoff ? term.index + amount : term.index };
    case 'Type': case 'Nat': case 'Bool': case 'Empty': case 'Zero': case 'True': case 'False': return term;
    case 'Pi': return { ...term, domain: shift(term.domain, amount, cutoff), body: shift(term.body, amount, cutoff + 1) };
    case 'Prod': return prod(shift(term.left, amount, cutoff), shift(term.right, amount, cutoff));
    case 'Pair': return pair(shift(term.left, amount, cutoff), shift(term.right, amount, cutoff));
    case 'Fst': return fst(shift(term.pair, amount, cutoff));
    case 'Snd': return snd(shift(term.pair, amount, cutoff));
    case 'Lambda': return { ...term, domain: shift(term.domain, amount, cutoff), body: shift(term.body, amount, cutoff + 1) };
    case 'App': return app(shift(term.fn, amount, cutoff), shift(term.arg, amount, cutoff));
    case 'Succ': return succ(shift(term.value, amount, cutoff));
    case 'NatRec': return natRec(shift(term.motive, amount, cutoff), shift(term.zeroCase, amount, cutoff), shift(term.succCase, amount, cutoff), shift(term.scrutinee, amount, cutoff));
    case 'BoolRec': return boolRec(shift(term.motive, amount, cutoff), shift(term.trueCase, amount, cutoff), shift(term.falseCase, amount, cutoff), shift(term.scrutinee, amount, cutoff));
    case 'EmptyRec': return emptyRec(shift(term.motive, amount, cutoff), shift(term.scrutinee, amount, cutoff));
    case 'Eq': return { ...term, type: shift(term.type, amount, cutoff), left: shift(term.left, amount, cutoff), right: shift(term.right, amount, cutoff) };
    case 'Refl': return { ...term, type: shift(term.type, amount, cutoff), value: shift(term.value, amount, cutoff) };
    case 'EqRec': return { ...term, motive: shift(term.motive, amount, cutoff), reflCase: shift(term.reflCase, amount, cutoff), left: shift(term.left, amount, cutoff), right: shift(term.right, amount, cutoff), equality: shift(term.equality, amount, cutoff) };
  }
}

export function substitute(body: Term, replacement: Term, depth = 0): Term {
  switch (body.kind) {
    case 'Var':
      if (body.index === depth) return shift(replacement, depth);
      if (body.index > depth) return { ...body, index: body.index - 1 };
      return body;
    case 'Type': case 'Nat': case 'Bool': case 'Empty': case 'Zero': case 'True': case 'False': return body;
    case 'Pi': return { ...body, domain: substitute(body.domain, replacement, depth), body: substitute(body.body, replacement, depth + 1) };
    case 'Prod': return prod(substitute(body.left, replacement, depth), substitute(body.right, replacement, depth));
    case 'Pair': return pair(substitute(body.left, replacement, depth), substitute(body.right, replacement, depth));
    case 'Fst': return fst(substitute(body.pair, replacement, depth));
    case 'Snd': return snd(substitute(body.pair, replacement, depth));
    case 'Lambda': return { ...body, domain: substitute(body.domain, replacement, depth), body: substitute(body.body, replacement, depth + 1) };
    case 'App': return app(substitute(body.fn, replacement, depth), substitute(body.arg, replacement, depth));
    case 'Succ': return succ(substitute(body.value, replacement, depth));
    case 'NatRec': return natRec(substitute(body.motive, replacement, depth), substitute(body.zeroCase, replacement, depth), substitute(body.succCase, replacement, depth), substitute(body.scrutinee, replacement, depth));
    case 'BoolRec': return boolRec(substitute(body.motive, replacement, depth), substitute(body.trueCase, replacement, depth), substitute(body.falseCase, replacement, depth), substitute(body.scrutinee, replacement, depth));
    case 'EmptyRec': return emptyRec(substitute(body.motive, replacement, depth), substitute(body.scrutinee, replacement, depth));
    case 'Eq': return { ...body, type: substitute(body.type, replacement, depth), left: substitute(body.left, replacement, depth), right: substitute(body.right, replacement, depth) };
    case 'Refl': return { ...body, type: substitute(body.type, replacement, depth), value: substitute(body.value, replacement, depth) };
    case 'EqRec': return { ...body, motive: substitute(body.motive, replacement, depth), reflCase: substitute(body.reflCase, replacement, depth), left: substitute(body.left, replacement, depth), right: substitute(body.right, replacement, depth), equality: substitute(body.equality, replacement, depth) };
  }
}

export function whnf(term: Term): Term {
  while (true) {
    if (term.kind === 'App' && term.fn.kind === 'Lambda') {
      term = substitute(term.fn.body, term.arg);
      continue;
    }
    if (term.kind === 'Fst') {
      const pairValue = whnf(term.pair);
      if (pairValue.kind === 'Pair') { term = pairValue.left; continue; }
    }
    if (term.kind === 'Snd') {
      const pairValue = whnf(term.pair);
      if (pairValue.kind === 'Pair') { term = pairValue.right; continue; }
    }
    if (term.kind === 'NatRec') {
      const scrutinee = whnf(term.scrutinee);
      if (scrutinee.kind === 'Zero') {
        term = term.zeroCase;
        continue;
      }
      if (scrutinee.kind === 'Succ') {
        term = app(app(term.succCase, scrutinee.value), natRec(term.motive, term.zeroCase, term.succCase, scrutinee.value));
        continue;
      }
    }
    if (term.kind === 'BoolRec') {
      const scrutinee = whnf(term.scrutinee);
      if (scrutinee.kind === 'True') { term = term.trueCase; continue; }
      if (scrutinee.kind === 'False') { term = term.falseCase; continue; }
    }
    if (term.kind === 'EqRec' && term.equality.kind === 'Refl') {
      term = term.reflCase;
      continue;
    }
    return term;
  }
}

export function normalize(term: Term): Term {
  const reduced = whnf(term);
  if (reduced.kind === 'App' && reduced.fn.kind === 'Lambda') {
    return normalize(substitute(reduced.fn.body, reduced.arg));
  }
  // Product eta: reconstructing a pair from both projections is definitionally
  // the original pair. This is the standard eta rule for non-dependent products
  // and makes coordinatewise proofs work for arbitrary points.
  if ((reduced as Term).kind === 'Pair') {
    const pairTerm = reduced as Extract<Term, { kind: 'Pair' }>;
    const left = normalize(pairTerm.left);
    const right = normalize(pairTerm.right);
    if (left.kind === 'Fst' && right.kind === 'Snd' && structuralEqual(left.pair, right.pair)) return normalize(left.pair);
    return pair(left, right);
  }
  switch (reduced.kind) {
    case 'Type': case 'Nat': case 'Bool': case 'Empty': case 'Zero': case 'True': case 'False': case 'Var': return reduced;
    case 'Pi': return { ...reduced, domain: normalize(reduced.domain), body: normalize(reduced.body) };
    case 'Prod': return prod(normalize(reduced.left), normalize(reduced.right));
    case 'Fst': {
      const value = normalize(reduced.pair);
      return value.kind === 'Pair' ? normalize(value.left) : fst(value);
    }
    case 'Snd': {
      const value = normalize(reduced.pair);
      return value.kind === 'Pair' ? normalize(value.right) : snd(value);
    }
    case 'Lambda': return { ...reduced, domain: normalize(reduced.domain), body: normalize(reduced.body) };
    case 'App': {
      const fn = normalize(reduced.fn);
      const arg = normalize(reduced.arg);
      if (fn.kind === 'Lambda') return normalize(substitute(fn.body, arg));
      return app(fn, arg);
    }
    case 'Succ': return succ(normalize(reduced.value));
    case 'NatRec': {
      if (reduced.scrutinee.kind === 'Zero') return normalize(reduced.zeroCase);
      if (reduced.scrutinee.kind === 'Succ') return normalize(app(app(reduced.succCase, reduced.scrutinee.value), natRec(reduced.motive, reduced.zeroCase, reduced.succCase, reduced.scrutinee.value)));
      return { ...reduced, motive: normalize(reduced.motive), zeroCase: normalize(reduced.zeroCase), succCase: normalize(reduced.succCase), scrutinee: normalize(reduced.scrutinee) };
    }
    case 'BoolRec': {
      if (reduced.scrutinee.kind === 'True') return normalize(reduced.trueCase);
      if (reduced.scrutinee.kind === 'False') return normalize(reduced.falseCase);
      return { ...reduced, motive: normalize(reduced.motive), trueCase: normalize(reduced.trueCase), falseCase: normalize(reduced.falseCase), scrutinee: normalize(reduced.scrutinee) };
    }
    case 'EmptyRec': return { ...reduced, motive: normalize(reduced.motive), scrutinee: normalize(reduced.scrutinee) };
    case 'Eq': return { ...reduced, type: normalize(reduced.type), left: normalize(reduced.left), right: normalize(reduced.right) };
    case 'Refl': return { ...reduced, type: normalize(reduced.type), value: normalize(reduced.value) };
    case 'EqRec': return reduced.equality.kind === 'Refl' ? normalize(reduced.reflCase) : reduced;
  }
  return reduced;
}

export function definitionalEqual(left: Term, right: Term): boolean {
  return structuralEqual(normalize(left), normalize(right));
}

export function structuralEqual(left: Term, right: Term): boolean {
  if (left.kind !== right.kind) return false;
  switch (left.kind) {
    case 'Type': case 'Nat': case 'Bool': case 'Empty': case 'Zero': case 'True': case 'False': return true;
    case 'Var': return left.index === (right as typeof left).index;
    case 'Pi': case 'Lambda': {
      const r = right as typeof left;
      return definitionalEqual(left.domain, r.domain) && structuralEqual(left.body, r.body);
    }
    case 'Prod': { const r = right as typeof left; return definitionalEqual(left.left, r.left) && definitionalEqual(left.right, r.right); }
    case 'Pair': { const r = right as typeof left; return definitionalEqual(left.left, r.left) && definitionalEqual(left.right, r.right); }
    case 'Fst': return definitionalEqual(left.pair, (right as typeof left).pair);
    case 'Snd': return definitionalEqual(left.pair, (right as typeof left).pair);
    case 'App': { const r = right as typeof left; return definitionalEqual(left.fn, r.fn) && definitionalEqual(left.arg, r.arg); }
    case 'Succ': return definitionalEqual(left.value, (right as typeof left).value);
    case 'NatRec': { const r = right as typeof left; return structuralEqual(left.motive, r.motive) && structuralEqual(left.zeroCase, r.zeroCase) && structuralEqual(left.succCase, r.succCase) && structuralEqual(left.scrutinee, r.scrutinee); }
    case 'BoolRec': { const r = right as typeof left; return structuralEqual(left.motive, r.motive) && structuralEqual(left.trueCase, r.trueCase) && structuralEqual(left.falseCase, r.falseCase) && structuralEqual(left.scrutinee, r.scrutinee); }
    case 'EmptyRec': { const r = right as typeof left; return structuralEqual(left.motive, r.motive) && structuralEqual(left.scrutinee, r.scrutinee); }
    case 'Eq': { const r = right as typeof left; return definitionalEqual(left.type, r.type) && definitionalEqual(left.left, r.left) && definitionalEqual(left.right, r.right); }
    case 'Refl': { const r = right as typeof left; return definitionalEqual(left.type, r.type) && definitionalEqual(left.value, r.value); }
    case 'EqRec': { const r = right as typeof left; return structuralEqual(left.motive, r.motive) && structuralEqual(left.reflCase, r.reflCase) && structuralEqual(left.left, r.left) && structuralEqual(left.right, r.right) && structuralEqual(left.equality, r.equality); }
  }
}
