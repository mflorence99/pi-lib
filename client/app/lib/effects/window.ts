import 'rxjs/add/operator/do';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';

import * as window from '../actions/window';

import { Actions, Effect } from '@ngrx/effects';
import { MediaEvent, WatchCSSMedia } from '../utils/watch-css-media';

import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { WindowState } from '../reducers/window';

/**
 * Side-effects for window actions
 */

const RECORDABLE_ACTIONS = [
  window.ActionTypes.GO_LARGE,
  window.ActionTypes.GO_SMALL,
  window.ActionTypes.TOGGLE_SIDEBAR
];

@Injectable()
export class WindowEffects {

  /**
   * Listen for various actions to record last-used window state
   */

  @Effect() listen: Observable<Action> = this.actions
    .ofType(...RECORDABLE_ACTIONS)
    .withLatestFrom(this.store.select('window'), (action, state) => state)
    .do((state: WindowState) => this.lstor.set(window.ActionTypes.LOAD, state))
    .map((state: WindowState) => window.noop());

  /**
   * Listen for an init action to load last-used window state
   */

  @Effect() init: Observable<Action> = this.actions
    .ofType(window.ActionTypes.INIT)
    .startWith(window.init())
    .map((action: Action) => {
      const state = this.lstor.get(window.ActionTypes.LOAD) || {};
      return window.load(state);
    });

  // we should strongly-type the Store, but we can't because it belongs
  // to someone else and we're in a common library
  constructor(private actions: Actions,
              private lstor: LocalStorageService,
              private store: Store<any>) {
    const watcher = WatchCSSMedia();
    watcher.onWidthLessThan('1024px', (event: MediaEvent) => {
      this.store.dispatch(event.matches? window.goSmall() : window.goLarge());
    });
  }

}
