import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';

import * as sidebar from '../actions/sidebar';

import { Actions, Effect } from '@ngrx/effects';

import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs/Observable';
import { SidebarState } from '../reducers/sidebar';
import { Store } from '@ngrx/store';
import { unique } from '../utils';

/**
 * Side-effects for sidebar actions
 */

const LAST_USED_SIDEBAR_STATE = unique('last-used-sidebar-state');

@Injectable()
export class SidebarEffects {

  /**
   * Listen for an init action to load last-used sidebar state
   */

  @Effect() init: Observable<Action> = this.actions
    .ofType(sidebar.ActionTypes.INIT)
    .startWith(sidebar.init())
    .map((action: Action) => sidebar.load(this.lstor.get(LAST_USED_SIDEBAR_STATE)));

  /**
   * Listen for any standard action to record last-used sidebar state
   */

  @Effect() listen: Observable<Action> = this.actions
    .ofType(sidebar.ActionTypes.TOGGLE)
    .withLatestFrom(this.store.select('sidebar'), (action, state) => state)
    .do((state: SidebarState) => this.lstor.set(LAST_USED_SIDEBAR_STATE, state))
    .map((state: SidebarState) => sidebar.noop());

  // we should strongly-type the Store, but we can't because it belongs
  // to someone else and we're in a common library
  constructor(private actions: Actions,
              private lstor: LocalStorageService,
              private store: Store<any>) { }

}
