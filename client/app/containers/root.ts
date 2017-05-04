import * as window from '../lib/reducers/window';

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AppState } from '../reducers';
import { AutoUnsubscribe } from '../lib/decorators/auto-unsubscribe';
import { EnvService } from '../lib/services/env';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { config } from '../config';
import { toggleSidebar } from '../lib/actions/window';

/**
 * pi-lib demo app root
 */

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pi-root',
  templateUrl: 'root.html',
  styleUrls: ['root.less']
})

@AutoUnsubscribe()
export class RootComponent {
  windowState: Observable<window.WindowState>;

  /** ctor */
  constructor(env: EnvService,
              private store: Store<AppState>) {
    console.log('<pi-root> loading', config, env);
    this.windowState = store.select(state => state.window);
  }

  /**
   * Toggle the sidebar
   *
   * NOTE: this really belongs in a header component we don't have
   */
  toggleSidebar() {
    this.store.dispatch(toggleSidebar());
  }

}
