import * as router from '@ngrx/router-store';

import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

import { routeAnimation } from '../animations';

/**
 * Animate a router outlet
 */

@Component({
  animations: [routeAnimation()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'lib-animated-router-outlet',
  styleUrls: ['animated-router-outlet.less'],
  templateUrl: 'animated-router-outlet.html'
})

export class AnimatedRouterOutletComponent {

  @HostBinding('@routeAnimation') get trigger() {
    return this.routerState.path;
  }

  @Input() routerState: router.RouterState = router.initialState;

}
