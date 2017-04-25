import 'rxjs/add/operator/do';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';

import * as extendedActions from '../actions/router';

import { Actions, Effect } from '@ngrx/effects';
import { replace, routerActions } from '@ngrx/router-store';

import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
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
   * Listen for any init action to load last-used route
   */

  @Effect() init: Observable<Action> = this.actions
    .ofType(extendedActions.ActionTypes.INIT)
    .startWith(new extendedActions.InitAction())
    .map((action: Action) => replace(<string>this.lstor.get(LAST_USED_ROUTE)));

  /**
   * Listen for any standard action to record last-used route
   */

  @Effect() listen: Observable<Action> = this.actions
    .ofType(...STANDARD_ACTIONS)
    .do((action: Action) => this.lstor.set(LAST_USED_ROUTE, action.payload.path))
    .switchMap((action: Action) => of());

  /**
   * ctor
   */

  constructor(private actions: Actions,
              private lstor: LocalStorageService) { }

}
