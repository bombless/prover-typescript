import { Term, Nat, prod, pair, variable, pi, lambda, app, eq, refl, fst } from '../syntax/ast';
import { incidence } from './geometry-incidence';
import { onCircle, Circle2 } from './geometry-circle';
import { onVerticalLine } from './geometry-line';
import { normSq } from './geometry-metrics';

export const Point2: Term = prod(Nat, Nat);
export const Line2: Term = prod(Point2, prod(Nat, Nat));

const one: Term = { kind: 'Succ', value: { kind: 'Zero' } };
const selfLine = (p: Term): Term => pair(p, pair(one, { kind: 'Zero' }));
const selfCircle = (p: Term): Term => pair(p, app(normSq, p));

/** Any point generates matching line, circle, vertical-line, and metric certificates. */
export const pointSelfConfigurationType: Term = pi(Point2,
  prod(
    app(app(incidence, variable(0)), selfLine(variable(0))),
    prod(
      app(app(onCircle, variable(0)), selfCircle(variable(0))),
      prod(
        app(app(onVerticalLine, variable(0)), fst(variable(0))),
        eq(Nat, app(normSq, variable(0)), app(normSq, variable(0))))
    )
  ), 'p');

export const pointSelfConfigurationProof: Term = lambda(Point2,
  pair(
    refl(Nat, fst(variable(0))),
    pair(
      refl(Nat, app(normSq, variable(0))),
      pair(
        refl(Nat, fst(variable(0))),
        refl(Nat, app(normSq, variable(0))))
    )
  ), 'p');
