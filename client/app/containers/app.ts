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
 * App root
 */

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pi-root',
  templateUrl: 'app.html',
  styleUrls: ['app.less']
})

export class AppComponent {
  routerState: Observable<router.RouterState>;
  sidebarState: Observable<sidebar.SidebarState>;

  sidebarItems: SidebarItem[] = [
    new SidebarItem('Raspberry Pi', '/gpio', 'calculator', 'GPIO Pins'),
    new SidebarItem('Navigation', '/a', 'tachometer', 'Dashboard'),
    new SidebarItem('Navigation', '/b', 'calendar', 'Calendar'),
    new SidebarItem('Navigation', '/x', 'envelope', 'Email'),
    new SidebarItem('Components', '/y', 'th', 'Layout'),
    new SidebarItem('Components', '/c', 'table', 'Table'),
    new SidebarItem('Components', '/y', 'sliders', 'Settings'),
    new SidebarItem('Components', '/x', 'area-chart', 'Chart')
  ];

  constructor(env: EnvService,
              store: Store<AppState>) {
    console.log('<pi-root> loading', config, env);
    this.routerState = store.select(state => state.router);
    this.sidebarState = store.select(state => state.sidebar);
  }

}
