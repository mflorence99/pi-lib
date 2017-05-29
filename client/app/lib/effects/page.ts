import 'rxjs/add/operator/do';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/withLatestFrom';

import * as page from '../actions/page';

import { Actions, Effect } from '@ngrx/effects';

import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PageState } from '../reducers/page';
import { Store } from '@ngrx/store';
import { Title } from '@angular/platform-browser';

/**
 * Side-effects for page actions
 */

@Injectable()
export class PageEffects {

  /**
   * Listen for title action
   */

  @Effect() expando: Observable<Action> = this.actions
    .ofType(page.ActionTypes.TITLE)
    .withLatestFrom(this.store.select('page'), (action, state) => state)
    .do((state: PageState) => this.setTitle(state.title))
    .map((state: PageState) => page.noop());

  // we should strongly-type the Store, but we can't because it belongs
  // to someone else and we're in a common library
  constructor(private actions: Actions,
              private store: Store<any>,
              private title: Title) { }

  // private methods

  private setTitle(text: string) {
    const orig = this.title.getTitle();
    const ix = orig.indexOf(' - ');
    if (ix === -1)
      this.title.setTitle(`${orig} - ${text}`);
    else this.title.setTitle(`${orig.substring(0, ix)} - ${text}`);
  }

}
