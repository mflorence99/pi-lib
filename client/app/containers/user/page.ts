import * as user from '../../lib/reducers/user';

import { AppState } from '../../reducers';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { flyInOut } from '../../lib/animations';

/**
 * User demo page
 */

@Component({
  animations: [flyInOut()],
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
