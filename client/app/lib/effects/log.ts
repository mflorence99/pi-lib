import 'rxjs/add/operator/do';

import { Actions, Effect } from '@ngrx/effects';

import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

/**
 * Log all actions
 */

@Injectable()
export class LogEffects {

  /**
   * Simply log all actions in dev mode
   */

  @Effect({dispatch: false}) logActions = this.actions
    .filter(action => !environment.production)
    .do((action => console.log(`%c ${action.type}`, 'color: green', action.payload)));

  /** ctor */
  constructor(private actions: Actions) { }

}
