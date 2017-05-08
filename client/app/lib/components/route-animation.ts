import * as router from '@ngrx/router-store';

import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

import { routeAnimation } from '../animations';

/**
 * This is all crap until Angular 4.1 releases route transitions
 */

@Component({
  animations: [routeAnimation()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'lib-route-animation',
  styleUrls: ['route-animation.less'],
  templateUrl: 'route-animation.html'
})

export class RouteAnimationComponent {

  @HostBinding('@routeAnimation') get trigger() {
    console.log(this.routerState);
    return this.routerState.path;
  }

  @Input() routerState: router.RouterState = router.initialState;

}
