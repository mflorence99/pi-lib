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

const STANDARD_ACTIONS = [
  routerActions.GO,
  routerActions.REPLACE,
  routerActions.SEARCH,
  routerActions.SHOW,
  routerActions.BACK,
  routerActions.FORWARD,
  routerActions.UPDATE_LOCATION
];

@Injectable()
export class RouterEffects {

  /**
   * Listen for an init action to load last-used route
   */

  @Effect() init: Observable<Action> = this.actions
    .ofType(extendedActions.ActionTypes.INIT)
    .startWith(extendedActions.init())
    .do((action: Action) => console.log('load', this.lstor.get(LAST_USED_ROUTE)))
    .map((action: Action) => show([this.lstor.get(LAST_USED_ROUTE)]));

  /**
   * Listen for any standard action to record last-used route
   */

  @Effect() listen: Observable<Action> = this.actions
    .ofType(...STANDARD_ACTIONS)
    .do((action: Action) => console.log('go', this.lstor.get(LAST_USED_ROUTE)))
    .do((action: Action) => this.lstor.set(LAST_USED_ROUTE, action.payload.path))
    .map((action: Action) => extendedActions.noop());

  /** ctor */
  constructor(private actions: Actions,
              private lstor: LocalStorageService) { }

}
