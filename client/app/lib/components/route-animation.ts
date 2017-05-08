// see https://github.com/bergben/ng2-page-transition
// will be replaced with Angular 4.1

import { ChangeDetectionStrategy, Component, HostBinding, Inject, Input, forwardRef } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationStart, Router } from '@angular/router';

import { defaultAnimation } from '../animations';

@Component({
  animations: [defaultAnimation()],
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'lib-route-animation',
  template: '<ng-content></ng-content>'
})

export class RouteAnimationComponent {

  @HostBinding('@libRouteState') get routeState() {
    console.log('GET STATE', this.animation.state);
    return this.animation.custom || this.animation.state;
  }
  @HostBinding('style.display') display = 'block';

  @Input() animation: any = {
    state: 'leave',
    custom: false,
    enterDelay: 250
  };

  delayPromise: Promise<any>;

  constructor(@Inject(forwardRef(() => Router)) router: Router) {
    this.animation.state = 'leave';
    router.events.subscribe(event => this.routerSubscription(event));
  }

  private routerSubscription(event: any) {
    if (event instanceof NavigationStart) {
      this.animation.state = 'leave';
      console.log('LEAVE', event, this.animation.state);
      this.delayPromise = new Promise((resolve, reject) => {
        window.setTimeout(() => resolve(true), this.animation.enterDelay);
      });
    }
    else if (event instanceof NavigationEnd
          || event instanceof NavigationCancel) {
      if (typeof this.delayPromise !== 'undefined') {
        this.delayPromise.then(() => {
          this.animation.state = 'out';
          console.log('OUT', event, this.animation.state);
          setTimeout(() => {
            this.animation.state = 'enter';
            console.log('ENTER #1', event, this.animation.state);
          }, 0);
        });
      }
      else {
        this.animation.state = 'out';
        setTimeout(() => {
          this.animation.state = 'enter';
            console.log('ENTER #2', event, this.animation.state);
        }, 0);
      }
    }
  }
}
