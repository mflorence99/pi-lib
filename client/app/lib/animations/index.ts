import {animate, state, style, transition, trigger} from '@angular/animations';

/**
 * Common animation functions
 */

// why any return?
// http://stackoverflow.com/questions/
//  43335336/error-ts4058-return-type-of-exported-function-has-or-is-using-name-x-from-exter
export function flyInOut(): any {
  return trigger('flyInOut', [
    state('in', style({transform: 'translate(0, 0)'})),
    transition('void => *', [
      animate(100, style({transform: 'translate(-100%, 0)'}))
    ]),
    transition('* => void', [
      animate(100, style({transform: 'translate(100%, 0)'}))
    ])
  ]);
}
