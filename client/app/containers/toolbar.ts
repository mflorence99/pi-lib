import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UserState, initialState } from '../lib/reducers/user';

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
  @Input() userState: UserState = initialState;

  /** ctor */
  constructor(private store: Store<AppState>) { }

  /** Toggle the sidebar */
  toggleSidebar() {
    this.store.dispatch(toggleSidebar());
  }

}
