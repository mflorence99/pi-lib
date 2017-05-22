import * as router from '@ngrx/router-store';
import * as user from '../lib/reducers/user';
import * as window from '../lib/reducers/window';

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfiguratorService, MediaSizeBreaks } from '../lib/services/configurator';

import { AppState } from '../reducers';
import { AutoUnsubscribe } from '../lib/decorators/auto-unsubscribe';
import { EnvService } from '../lib/services/env';
import { NavigatorItem } from '../lib/components/navigator';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { config } from '../config';

/**
 * pi-lib demo app root
 */

const MEDIA_SIZE_BREAKS: MediaSizeBreaks = {
  large: '(min-width: 1024px)',
  small: '(max-width: 1023px)'
};

const NAVIGATOR_ITEMS: NavigatorItem[] = [
  new NavigatorItem('/home', 'home', 'Welcome!'),

  // general components

  new NavigatorItem('/buttons', 'window-restore', 'Buttons & Dialogs', 'Components'),
  new NavigatorItem('/charts', 'area-chart', 'Google Charts', 'Components'),
  new NavigatorItem('/drawers', 'window-maximize', 'Drawer Panels', 'Components'),
  new NavigatorItem('/forms', 'th', 'Polymer Forms', 'Components'),
  new NavigatorItem('/markdown', 'code', 'Markdown', 'Components'),
  new NavigatorItem('/pipes', 'filter', 'Miscellaneous Pipes', 'Components'),

  // pagination

  new NavigatorItem('/pagination', 'sort-amount-asc', 'All-in-one Test', 'Pagination & Sort'),

  // reducers

  new NavigatorItem('/user', 'filter', 'User State', 'Reducers')
];

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'lib-root',
  templateUrl: 'root.html',
  styleUrls: ['root.less']
})

@AutoUnsubscribe()
export class RootComponent {
  routerState: Observable<router.RouterState>;
  userState: Observable<user.UserState>;
  windowState: Observable<window.WindowState>;

  /** ctor */
  constructor(configurator: ConfiguratorService,
              env: EnvService,
              store: Store<AppState>) {
    console.log('%c <lib-root> loading', 'color: blue', config, env);
    this.routerState = store.select(state => state.router);
    this.userState = store.select(state => state.user);
    this.windowState = store.select(state => state.window);
    // configure the app
    setTimeout(() => {
      configurator.withMediaSizeBreaks(MEDIA_SIZE_BREAKS);
      configurator.withNavigatorItems(NAVIGATOR_ITEMS);
    }, 0);
  }

}
