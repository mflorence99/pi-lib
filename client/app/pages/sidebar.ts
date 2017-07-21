import * as navigator from '../lib/reducers/navigator';
import * as router from '@ngrx/router-store';

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AppState } from '../reducers';
import { AutoUnsubscribe } from '../lib/decorators/auto-unsubscribe';
import { ConfiguratorService } from '../lib/services/configurator';
import { LifecycleComponent } from '../lib/components/lifecycle-component';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

/**
 * Demo app sidebar
 */

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'lib-sidebar',
  templateUrl: 'sidebar.html',
  styleUrls: ['sidebar.less']
})

@AutoUnsubscribe()
export class SidebarComponent extends LifecycleComponent {

  routerState: Observable<router.RouterReducerState>;
  navigatorState: Observable<navigator.NavigatorState>;

  /** ctor */
  constructor(public configurator: ConfiguratorService,
              store: Store<AppState>) {
    super();
    this.navigatorState = store.select(state => state.navigator);
    this.routerState = store.select(state => state.router);
  }

}
