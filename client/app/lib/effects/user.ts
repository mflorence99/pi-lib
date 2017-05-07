import 'rxjs/add/operator/do';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/withLatestFrom';

import * as user from '../actions/user';

import { Actions, Effect } from '@ngrx/effects';
import { UserState, initialState } from '../reducers/user';

import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

/**
 * Side-effects for user actions
 */

@Injectable()
export class UserEffects {

  /**
   * Listen for new user action
   */

  @Effect() expando: Observable<Action> = this.actions
    .ofType(user.ActionTypes.NEW_USER)
    .withLatestFrom(this.store.select('user'), (action, state) => state)
    .do((state: UserState) => this.lstor.set(user.ActionTypes.NEW_USER, state))
    .map((state: UserState) => user.noop());

  /**
   * Listen for an init action to load last-used user state
   */

  @Effect() init: Observable<Action> = this.actions
    .ofType(user.ActionTypes.INIT)
    .startWith(user.init())
    .map((action: Action) => {
      const state = this.lstor.get(user.ActionTypes.NEW_USER) || initialState;
      return user.load(state);
    });

  // we should strongly-type the Store, but we can't because it belongs
  // to someone else and we're in a common library
  constructor(private actions: Actions,
              private lstor: LocalStorageService,
              private store: Store<any>) { }

}
