import 'rxjs/add/operator/do';
import 'rxjs/add/operator/startWith';

import * as launchURL from '../actions/launch-url';

import { Actions, Effect } from '@ngrx/effects';
import { LaunchURLState, initialState } from '../reducers/launch-url';

import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { parseInitialSearchParams } from '../utils';

/**
 * Side-effects for launch URL actions
 */

@Injectable()
export class LaunchURLEffects {

  /**
   * Listen for an init action to load last-used user state
   */

  @Effect({dispatch: false}) init = this.actions
    .ofType(launchURL.ActionTypes.INIT)
    .startWith(launchURL.init())
    .map((action: Action) => {
      const state: LaunchURLState = Object.assign({}, initialState);
      state.location = location;
      state.search = parseInitialSearchParams();
      return state;
    })
    .do((state: LaunchURLState) => this.store.dispatch(launchURL.load(state)));

  // we should strongly-type the Store, but we can't because it belongs
  // to someone else and we're in a common library
  constructor(private actions: Actions,
              private store: Store<any>) { }

}
