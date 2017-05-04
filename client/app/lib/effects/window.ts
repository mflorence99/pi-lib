import 'rxjs/add/operator/do';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/withLatestFrom';

import * as window from '../actions/window';

import { Actions, Effect } from '@ngrx/effects';
import { ConfiguratorService, MediaSizeBreaks } from '../services/configurator';
import { MediaEvent, WatchCSSMedia } from '../utils/watch-css-media';

import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { WindowState } from '../reducers/window';

/**
 * Side-effects for window actions
 */

@Injectable()
export class WindowEffects {

  listeners: Subscription[] = [];

  /**
   * Listen for sidebar toggle actions to record last-used window state
   */

  @Effect() listen: Observable<Action> = this.actions
    .ofType(window.ActionTypes.TOGGLE_SIDEBAR)
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
              configurator: ConfiguratorService,
              private lstor: LocalStorageService,
              private store: Store<any>) {
    const watcher = WatchCSSMedia();
    // watch for media size breaks
    configurator.mediaSizeBreaks.subscribe((mediaSizeBreak: MediaSizeBreaks) => {
      // first, remove any prior listeners
      this.listeners.forEach((listener: Subscription) => listener.unsubscribe());
      // now listen for the new breaks
      this.listeners = [];
      Object.keys(mediaSizeBreak).forEach(key => {
        const query = mediaSizeBreak[key];
        const listener = watcher.addQuery(query, (event: MediaEvent) => {
          console.log(`${key} ${query} ${event.matches}`);
          if (event.matches)
            this.store.dispatch(window.mediaBreak({[key]: true}));
        });
        this.listeners.push(listener);
      });
    });
    // watch for print
    watcher.addQuery('print', (event: MediaEvent) => {
      this.store.dispatch(window.print(event.matches));
    });
  }

}
