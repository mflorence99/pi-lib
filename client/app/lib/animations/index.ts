import {animate, state, style, transition, trigger} from '@angular/animations';

/**
 * Common animation functions
 */

export function flyInOut() {
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
