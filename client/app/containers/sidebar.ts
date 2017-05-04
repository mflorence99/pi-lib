import * as navigator from '../lib/reducers/navigator';
import * as router from '@ngrx/router-store';

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AppState } from '../reducers';
import { AutoUnsubscribe } from '../lib/decorators/auto-unsubscribe';
import { ConfiguratorService } from '../lib/services/configurator';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

/**
 * Demo app sidebar
 */

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pi-sidebar',
  templateUrl: 'sidebar.html',
  styleUrls: ['sidebar.less']
})

@AutoUnsubscribe()
export class SidebarComponent {
  routerState: Observable<router.RouterState>;
  navigatorState: Observable<navigator.NavigatorState>;

  /** ctor */
  constructor(public configurator: ConfiguratorService,
              store: Store<AppState>) {
    this.navigatorState = store.select(state => state.navigator);
    this.routerState = store.select(state => state.router);
  }

}
