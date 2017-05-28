import * as page from '../lib/reducers/page';
import * as user from '../lib/reducers/user';

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { AppState } from '../reducers';
import { Store } from '@ngrx/store';
import { toggleSidebar } from '../lib/actions/window';

/**
 * Demo app toolbar
 */

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'lib-toolbar',
  templateUrl: 'toolbar.html',
  styleUrls: ['toolbar.less']
})

export class ToolbarComponent {
  @Input() pageState: page.PageState = page.initialState;
  @Input() userState: user.UserState = user.initialState;

  /** ctor */
  constructor(private store: Store<AppState>) { }

  /** Toggle the sidebar */
  toggleSidebar() {
    this.store.dispatch(toggleSidebar());
  }

}
