import { Term, Nat, Zero, variable, pi, lambda, app, natRec, eq, refl } from '../syntax/ast';
import { shift } from '../kernel/reduction';
import { addTerm } from './nat';
import { mulTerm } from './mul';
import { addAssocProof } from './add-assoc';
import { addCommProof } from './add-comm';
import { equalityCongruence, equalitySymmetry, equalityTransitivity } from './equality';

const assoc = (a: Term, b: Term, c: Term): Term => app(app(app(addAssocProof, a), b), c);
const comm = (a: Term, b: Term): Term => app(app(addCommProof, a), b);
const trans = (a: Term, b: Term, c: Term, ab: Term, bc: Term): Term =>
  equalityTransitivity(Nat, a, b, c, ab, bc);
const symm = (a: Term, b: Term, proof: Term): Term => equalitySymmetry(Nat, a, b, proof);
const addLeft = (prefix: Term, a: Term, b: Term, proof: Term): Term =>
  equalityCongruence(Nat, Nat, lambda(Nat, addTerm(shift(prefix, 1), variable(0))), a, b, proof);
const addRight = (a: Term, b: Term, suffix: Term, proof: Term): Term =>
  equalityCongruence(Nat, Nat, lambda(Nat, addTerm(variable(0), shift(suffix, 1))), a, b, proof);

/** (a+b)+(c+d) = (a+c)+(b+d), using the existing addition theorems. */
function interchange(a: Term, b: Term, c: Term, d: Term): Term {
  const start = addTerm(addTerm(a, b), addTerm(c, d));
  const first = addTerm(a, addTerm(b, addTerm(c, d)));
  const second = addTerm(a, addTerm(addTerm(b, c), d));
  const third = addTerm(a, addTerm(addTerm(c, b), d));
  const fourth = addTerm(a, addTerm(c, addTerm(b, d)));
  const end = addTerm(addTerm(a, c), addTerm(b, d));
  const firstProof = assoc(a, b, addTerm(c, d));
  const secondProof = addLeft(a, addTerm(b, addTerm(c, d)), addTerm(addTerm(b, c), d),
    symm(addTerm(addTerm(b, c), d), addTerm(b, addTerm(c, d)), assoc(b, c, d)));
  const thirdProof = addLeft(a, addTerm(addTerm(b, c), d), addTerm(addTerm(c, b), d),
    addRight(addTerm(b, c), addTerm(c, b), d, comm(b, c)));
  const fourthProof = addLeft(a, addTerm(addTerm(c, b), d), addTerm(c, addTerm(b, d)), assoc(c, b, d));
  const lastProof = symm(end, fourth, assoc(a, c, addTerm(b, d)));
  return trans(start, first, end, firstProof,
    trans(first, second, end, secondProof,
      trans(second, third, end, thirdProof, trans(third, fourth, end, fourthProof, lastProof))));
}

/** (a+b)*c = a*c + b*c. The induction motive quantifies the other arguments. */
export const addMulType: Term = pi(Nat, pi(Nat, pi(Nat,
  eq(Nat, mulTerm(addTerm(variable(2), variable(1)), variable(0)),
    addTerm(mulTerm(variable(2), variable(0)), mulTerm(variable(1), variable(0)))), 'c'), 'b'), 'a');
const addMulMotive = lambda(Nat, pi(Nat, pi(Nat,
  eq(Nat, mulTerm(addTerm(variable(2), variable(1)), variable(0)),
    addTerm(mulTerm(variable(2), variable(0)), mulTerm(variable(1), variable(0)))), 'c'), 'b'), 'a');

// Successor context: a, ih, b, c. The equations below retain those indices.
const a = variable(3), ih = variable(2), b = variable(1), c = variable(0);
const ac = mulTerm(a, c), bc = mulTerm(b, c);
const sumProduct = mulTerm(addTerm(a, b), c);
const addMulStep = trans(addTerm(c, sumProduct), addTerm(c, addTerm(ac, bc)), addTerm(addTerm(c, ac), bc),
  addLeft(c, sumProduct, addTerm(ac, bc), app(app(ih, b), c)),
  symm(addTerm(addTerm(c, ac), bc), addTerm(c, addTerm(ac, bc)), assoc(c, ac, bc)));
export const addMulProof: Term = lambda(Nat,
  natRec(addMulMotive,
    lambda(Nat, lambda(Nat, refl(Nat, mulTerm(variable(1), variable(0))), 'c'), 'b'),
    lambda(Nat, lambda(app(addMulMotive, variable(0)),
      lambda(Nat, lambda(Nat, addMulStep, 'c'), 'b'), 'ih'), 'a'),
    variable(0)), 'a');

/** a*(b+c) = a*b + a*c. This direction also needs additive interchange. */
export const mulAddType: Term = pi(Nat, pi(Nat, pi(Nat,
  eq(Nat, mulTerm(variable(2), addTerm(variable(1), variable(0))),
    addTerm(mulTerm(variable(2), variable(1)), mulTerm(variable(2), variable(0)))), 'c'), 'b'), 'a');
const mulAddMotive = lambda(Nat, pi(Nat, pi(Nat,
  eq(Nat, mulTerm(variable(2), addTerm(variable(1), variable(0))),
    addTerm(mulTerm(variable(2), variable(1)), mulTerm(variable(2), variable(0)))), 'c'), 'b'), 'a');
const ab = mulTerm(a, b), productSum = mulTerm(a, addTerm(b, c));
const mulAddStep = trans(addTerm(addTerm(b, c), productSum), addTerm(addTerm(b, c), addTerm(ab, ac)),
  addTerm(addTerm(b, ab), addTerm(c, ac)),
  addLeft(addTerm(b, c), productSum, addTerm(ab, ac), app(app(ih, b), c)),
  interchange(b, c, ab, ac));
export const mulAddProof: Term = lambda(Nat,
  natRec(mulAddMotive,
    lambda(Nat, lambda(Nat, refl(Nat, Zero), 'c'), 'b'),
    lambda(Nat, lambda(app(mulAddMotive, variable(0)),
      lambda(Nat, lambda(Nat, mulAddStep, 'c'), 'b'), 'ih'), 'a'),
    variable(0)), 'a');

export function addMul(a: Term, b: Term, c: Term): Term { return app(app(app(addMulProof, a), b), c); }
export function mulAdd(a: Term, b: Term, c: Term): Term { return app(app(app(mulAddProof, a), b), c); }
