import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationStart, Router } from '@angular/router';

/**
 * This is all crap until Angular 4.1 releases route transitions
 */

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'lib-route-animation',
  styleUrls: ['route-animation.less'],
  templateUrl: 'route-animation.html'
})

export class RouteAnimationComponent {

  private entering: boolean;

  @HostBinding('style.opacity') get opacity() {
    return 1;
  }

  constructor(router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart)
        setTimeout(() => this.entering = false, 0);
      else if ((event instanceof NavigationEnd)
            || (event instanceof NavigationCancel))
        setTimeout(() => this.entering = true, 0);
    });
  }

}
