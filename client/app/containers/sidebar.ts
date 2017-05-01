import * as navigator from '../lib/reducers/navigator';
import * as router from '@ngrx/router-store';

import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

import { AppState } from '../reducers';
import { NavigatorItem } from '../lib/components/navigator';
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

export class SidebarComponent {
  @HostBinding('style.display') _display = 'block';

  routerState: Observable<router.RouterState>;
  navigatorState: Observable<navigator.NavigatorState>;

  navigatorItems: NavigatorItem[] = [
    new NavigatorItem('/home', 'home', 'Welcome!'),
    new NavigatorItem('/gpio', 'calculator', 'GPIO Pins', 'Raspberry Pi'),
    new NavigatorItem('/forms', 'th', 'Forms', 'Components')
  ];

  constructor(store: Store<AppState>) {
    this.navigatorState = store.select(state => state.navigator);
    this.routerState = store.select(state => state.router);
  }

}
