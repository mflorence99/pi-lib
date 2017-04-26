import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';

import * as gpio from '../actions/gpio-pins';

import { Actions, Effect } from '@ngrx/effects';

import { Action } from '@ngrx/store';
import { AppState } from '../reducers';
import { GPIOPinsService } from '../services/gpio-pins';
import { GPIOPinsState } from '../reducers/gpio-pins';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { of } from 'rxjs/observable/of';

/**
 * Side-effects for GPIO pins actions
 */

@Injectable()
export class GPIOPinsEffects {

  /**
   * Listen for toggle action
   */

  @Effect() listen: Observable<Action> = this.actions
    .ofType(gpio.ActionTypes.TOGGLE)
    .map((action: Action) => action.payload)
    .withLatestFrom(this.store.select('gpio'), (pin, state) => [pin, state[pin]])
    .switchMap(([pin, state]) => {
      return this.gpioPinsService.setOne(pin, !state)
        .map((payload: boolean[]) => {
            return payload.reduce((acc, _, ix) => {
              acc[String(ix + 1)] = payload[ix];
              return acc;
            }, {});
          })
        .map((payload: GPIOPinsState) => gpio.load(payload))
        .catch((error: Response) => of(gpio.noop()));
    });

  /** ctor */
  constructor(private actions: Actions,
              private gpioPinsService: GPIOPinsService,
              private store: Store<AppState>) { }

}
