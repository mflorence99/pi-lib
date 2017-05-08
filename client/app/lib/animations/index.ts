import {animate, state, style, transition, trigger} from '@angular/animations';

import { AnimationEntryMetadata } from '@angular/core';

/**
 * Common animation functions
 *
 * NOTE: why any return?
 * http://stackoverflow.com/questions/
 *   43335336/error-ts4058-return-type-of-exported-function-has-or-is-using-name-x-from-exter
 *
 * NOTE: this is all wrong but fix it when Angular 4.1 is released with route animations
 */

export function defaultAnimation(): AnimationEntryMetadata {
  return fadeOutAndIn();
}

export function fadeOutAndIn(): AnimationEntryMetadata {
  return trigger('libRouteState', [
    state('leave', style({
        opacity: 0.3,
    })),
    state('out', style({
        opacity: 0,
    })),
    state('enter', style({
        opacity: 1,
    })),
    transition('* => enter',
      animate('0.5s ease-in')
    ),
    transition('* => leave',
      animate('0.2s ease-out')
    ),
    transition('* => out',
      animate('0ms')
    )
  ]);
}
export function flyInOut(): AnimationEntryMetadata {
  return trigger('flyInOut', [
    state('in', style({transform: 'translate(0, 0)'})),
    transition('void => *', [
      animate(250, style({transform: 'translate(-100%, 0)'}))
    ]),
    transition('* => void', [
      animate(250, style({transform: 'translate(100%, 0)'}))
    ])
  ]);
}
