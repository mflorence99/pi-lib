import * as user from '../../lib/reducers/user';

import { AppState } from '../../reducers';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

/**
 * User demo page
 */

@Component({
  selector: 'lib-user-page',
  styleUrls: ['page.less'],
  templateUrl: 'page.html'
})

export class UserPageComponent {
  userState: Observable<user.UserState>;

  /** ctor */
  constructor(store: Store<AppState>) {
    this.userState = store.select(state => state.user);
  }

}
