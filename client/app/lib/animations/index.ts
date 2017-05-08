import { animate, style, transition, trigger } from '@angular/animations';

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
