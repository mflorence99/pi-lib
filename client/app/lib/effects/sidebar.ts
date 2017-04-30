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

/**
 * Side-effects for sidebar actions
 */

@Injectable()
export class SidebarEffects {

  /**
   * Listen for toggle action to record last-used sidebar state
   */

  @Effect() expando: Observable<Action> = this.actions
    .ofType(sidebar.ActionTypes.EXPANDO)
    .withLatestFrom(this.store.select('sidebar'), (action, state) => state)
    .do((state: SidebarState) => this.lstor.set(sidebar.ActionTypes.EXPANDO, state.expando))
    .map((state: SidebarState) => sidebar.noop());

  /**
   * Listen for an init action to load last-used sidebar state
   */

  @Effect() init: Observable<Action> = this.actions
    .ofType(sidebar.ActionTypes.INIT)
    .startWith(sidebar.init())
    .map((action: Action) => {
      const expando = this.lstor.get(sidebar.ActionTypes.EXPANDO) || {};
      return sidebar.load({expando});
    });

  // we should strongly-type the Store, but we can't because it belongs
  // to someone else and we're in a common library
  constructor(private actions: Actions,
              private lstor: LocalStorageService,
              private store: Store<any>) { }

}
