import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { numeral } from './nat';
import { Line2 } from './geometry-line';
import { translate } from './geometry-transform';
import { rotate90 } from './geometry-rotations';

export const Point2: Term = prod(Nat, Nat);

const line: Term = pair(pair(numeral(2), numeral(3)), pair(numeral(1), numeral(4)));

/** A concrete line's base point transforms by translation. */
export const translatedLineType: Term = eq(Point2, app(app(translate, app(rotate90, pair(numeral(2), numeral(3)))), pair(numeral(1), numeral(1))), pair(numeral(4), numeral(3)));
export const translatedLineProof: Term = refl(Point2, pair(numeral(4), numeral(3)));

/** A concrete line direction transforms by rotation. */
export const rotatedLineDirectionType: Term = eq(Point2, app(rotate90, pair(numeral(1), numeral(4))), pair(numeral(4), numeral(1)));
export const rotatedLineDirectionProof: Term = refl(Point2, pair(numeral(4), numeral(1)));

/** The line structure remains a pair after projecting and transforming components. */
export const transformedLineType: Term = eq(Line2,
  pair(app(app(translate, fstLine()), pair(numeral(1), numeral(1))), app(rotate90, sndLine())),
  pair(pair(numeral(3), numeral(4)), pair(numeral(4), numeral(1))));
export const transformedLineProof: Term = refl(Line2, pair(pair(numeral(3), numeral(4)), pair(numeral(4), numeral(1))));

function fstLine(): Term { return { kind: 'Fst', pair: line }; }
function sndLine(): Term { return { kind: 'Snd', pair: line }; }
