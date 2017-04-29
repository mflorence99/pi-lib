import * as router from '@ngrx/router-store';
import * as sidebar from '../lib/reducers/sidebar';

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AppState } from '../reducers';
import { EnvService } from '../lib/services/env';
import { Observable } from 'rxjs/Observable';
import { SidebarItem } from '../lib/components/sidebar';
import { Store } from '@ngrx/store';
import { config } from '../config';

/**
 * pi-lib demo app root
 */

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pi-root',
  templateUrl: 'root.html',
  styleUrls: ['root.less']
})

export class RootComponent {
  routerState: Observable<router.RouterState>;
  sidebarState: Observable<sidebar.SidebarState>;

  sidebarItems: SidebarItem[] = [
    new SidebarItem('Raspberry Pi', '/gpio', 'calculator', 'GPIO Pins'),
    new SidebarItem('Components', '/forms', 'th', 'Forms')
  ];

  constructor(env: EnvService,
              store: Store<AppState>) {
    console.log('<pi-root> loading', config, env);
    this.routerState = store.select(state => state.router);
    this.sidebarState = store.select(state => state.sidebar);
  }

}
