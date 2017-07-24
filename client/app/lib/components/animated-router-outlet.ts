import 'rxjs/add/operator/do';

import { ChangeDetectionStrategy, Component, HostBinding, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

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

export class AnimatedRouterOutletComponent implements OnInit {

  url: string;

  @HostBinding('@routeAnimation') get trigger() {
    return this.url;
  }

  /** ctor */
  constructor(private router: Router) { }

  // lifecycle methods

  ngOnInit() {
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .do((event: NavigationEnd) => this.url = event.url)
      .subscribe();
  }

}
