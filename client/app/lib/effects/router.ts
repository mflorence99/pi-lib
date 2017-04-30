import 'rxjs/add/operator/do';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';

import * as extendedActions from '../actions/router';

import { Actions, Effect } from '@ngrx/effects';
import { routerActions, show } from '@ngrx/router-store';

import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs/Observable';
import { unique } from '../utils';

/**
 * Side-effects for router actions
 */

const LAST_USED_ROUTE = unique('last-used-route');

@Injectable()
export class RouterEffects {

  /**
   * Listen for an init action to load last-used route
   *
   * NOTE: do we even need this? On reload, the listener below kicks in
   * where we just overwrite navigation to nothing with the last-used route
   */

  @Effect() init: Observable<Action> = this.actions
    .ofType(extendedActions.ActionTypes.INIT)
    .startWith(extendedActions.init())
    .map((action: Action) => show(this.last()));

  /**
   * Listen for any standard action to record last-used route
   */

  @Effect() updateLocation: Observable<Action> = this.actions
    .ofType(routerActions.UPDATE_LOCATION)
    .map((action: Action) => this.dref(action.payload.path))
    .do((path: string) => {
      if (path !== '/')
        this.lstor.set(LAST_USED_ROUTE, path);
    })
    .map((path: string) => (path === '/')? show(this.last()) : extendedActions.noop());

  /** ctor */
  constructor(private actions: Actions,
              private lstor: LocalStorageService) { }

  // private methods

  private dref(path: any): string {
    if (Array.isArray(path) && (path.length > 0))
      return path[0];
    else if (typeof path === 'string')
      return path;
    else return '/';
  }

  private last(): string[] {
    return [<string>this.lstor.get(LAST_USED_ROUTE) || '/'];
  }

}
