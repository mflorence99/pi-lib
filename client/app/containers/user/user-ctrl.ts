import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { AppState } from '../../reducers';
import { PolymerForm } from '../../lib/components/polymer-form';
import { Store } from '@ngrx/store';
import { newUser } from '../../lib/actions/user';

/**
 * User controller
 */

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'lib-user-ctrl',
  template: ''
})

export class UserCtrlComponent {

  // property accessors / mutators

  @Input() set userState(userState: PolymerForm) {
    if (userState && userState.submitted)
      setTimeout(() => this.store.dispatch(newUser(userState.values)), 0);
  }

  /** ctor */
  constructor(private store: Store<AppState>) { }

}
