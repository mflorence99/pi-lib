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

  @Input() set form(form: PolymerForm) {
    if (form && form.submitted)
      setTimeout(() => this.store.dispatch(newUser(form.values)), 0);
  }

  /** ctor */
  constructor(private store: Store<AppState>) { }

}
