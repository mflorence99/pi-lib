import 'rxjs/add/operator/do';
import 'rxjs/add/operator/defaultIfEmpty';
import 'rxjs/add/operator/withLatestFrom';

import { Actions, Effect, toPayload } from '@ngrx/effects';

import { Action } from '@ngrx/store';
import { ConfiguratorService } from '../services/configurator';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs/Observable';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';
import { Router } from '@angular/router';
import { unique } from '../utils';

/**
 * Side-effects for router actions
 */

const LAST_USED_ROUTE = unique('last-used-route');

@Injectable()
export class RouterEffects {

  /**
   * Listen for any standard action to record last-used route
   */

  @Effect({dispatch: false}) listen: Observable<Action> = this.actions
    .ofType(ROUTER_NAVIGATION)
    .map(toPayload)
    .do (payload => {
      const route = payload.routerState.url;
      const lastUsedRoute: string = this.lstor.get(LAST_USED_ROUTE);
      if ((route === '/') && lastUsedRoute)
        this.router.navigate([lastUsedRoute]);
    })
    .withLatestFrom(this.configurator.navigatorItems.defaultIfEmpty([]),
      (payload, navigatorItems) => [payload, navigatorItems])
    .do(([payload, navigatorItems]) => {
      const route = payload.routerState.url;
      if (route !== '/') {
        const sticky = navigatorItems.some(item =>
          item.options.sticky && (route === item.path));
        if (sticky)
          this.lstor.set(LAST_USED_ROUTE, route);
      }
    })
    .map(([payload, navigatorItems]) => payload);

  /** ctor */
  constructor(private actions: Actions,
              private configurator: ConfiguratorService,
              private lstor: LocalStorageService,
              private router: Router) { }

}
