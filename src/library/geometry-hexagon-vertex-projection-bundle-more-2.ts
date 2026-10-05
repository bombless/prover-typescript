import { Term, Nat, prod, pair, variable, pi, lambda, eq, refl, fst, snd } from '../syntax/ast';
import { Point2 } from './geometry-points';

export const Hexagon2: Term = prod(Point2, prod(Point2, prod(Point2, prod(Point2, prod(Point2, Point2)))));
const second = (q: Term): Term => fst(snd(q));
const third = (q: Term): Term => fst(snd(snd(q)));
const fourth = (q: Term): Term => fst(snd(snd(snd(q))));
const fifth = (q: Term): Term => fst(snd(snd(snd(snd(q)))));
const sixth = (q: Term): Term => snd(snd(snd(snd(snd(q)))));

/** All six vertices of a hexagon are available as a nested projection bundle. */
export const hexagonVerticesType: Term = pi(Hexagon2,
  prod(eq(Point2, fst(variable(0)), fst(variable(0))),
    prod(eq(Point2, second(variable(0)), second(variable(0))),
      prod(eq(Point2, third(variable(0)), third(variable(0))),
        prod(eq(Point2, fourth(variable(0)), fourth(variable(0))),
          prod(eq(Point2, fifth(variable(0)), fifth(variable(0))), eq(Point2, sixth(variable(0)), sixth(variable(0)))))
      )
    )), 'h');
export const hexagonVerticesProof: Term = lambda(Hexagon2,
  pair(refl(Point2, fst(variable(0))),
    pair(refl(Point2, second(variable(0))),
      pair(refl(Point2, third(variable(0))),
        pair(refl(Point2, fourth(variable(0))),
          pair(refl(Point2, fifth(variable(0))), refl(Point2, sixth(variable(0)))))
      )
    )), 'h');

/** The final five vertices reconstruct the hexagon tail. */
export const hexagonTailType: Term = pi(Hexagon2,
  eq(prod(Point2, prod(Point2, prod(Point2, prod(Point2, Point2)))),
    pair(second(variable(0)), pair(third(variable(0)), pair(fourth(variable(0)), pair(fifth(variable(0)), sixth(variable(0)))))),
    snd(variable(0))), 'h');
export const hexagonTailProof: Term = lambda(Hexagon2,
  refl(prod(Point2, prod(Point2, prod(Point2, prod(Point2, Point2)))), snd(variable(0))), 'h');
