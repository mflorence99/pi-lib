import { animate, state, style, transition, trigger } from '@angular/animations';

import { AnimationEntryMetadata } from '@angular/core';

/**
 * Common animation functions
 */

export function routeAnimation(): AnimationEntryMetadata {
  return trigger('routeAnimation', [
    transition('* => *', [
      style({transform: 'translateX(-100%)'}),
      animate('0.25s ease-in-out', style({transform: 'translateX(0%)'}))
    ])
  ]);
}


export function showHideAnimation(): AnimationEntryMetadata {
  return trigger('showHide', [
    state('shown', style({height: '*', opacity: 1})),
    state('hidden', style({height: 0, opacity: 0})),
    transition('* => *', animate('0.25s ease-in-out'))
  ]);
}
