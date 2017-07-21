import 'rxjs/add/operator/do';

import { Actions, Effect } from '@ngrx/effects';

import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

/**
 * Log all actions
 */

@Injectable()
export class LogEffects {

  /**
   * Simply log all actions
   */

  @Effect({dispatch: false}) logActions: Observable<Action> = this.actions
    .do(((action: any) => console.log(`%c ${action.type}`, 'color: green', action.payload)));

  /** ctor */
  constructor(private actions: Actions) { }

}
