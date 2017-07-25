import 'rxjs/add/operator/do';

import { Actions, Effect, toPayload } from '@ngrx/effects';
import { ROUTER_NAVIGATION, RouterNavigationPayload } from '@ngrx/router-store';

import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs/Observable';
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
    .do((payload: RouterNavigationPayload) => {
      const lastUsedRoute: string = this.lstor.get(LAST_USED_ROUTE);
      if (payload.routerState.url !== '/') {
        if (payload.routerState.url !== '/gateway/partners')
          this.lstor.set(LAST_USED_ROUTE, payload.routerState.url);
      }
      else if (lastUsedRoute)
        this.router.navigate([lastUsedRoute]);
    });

  /** ctor */
  constructor(private actions: Actions,
              private lstor: LocalStorageService,
              private router: Router) { }

}
