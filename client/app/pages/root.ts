import * as navigator from '../lib/reducers/navigator';
import * as page from '../lib/reducers/page';
import * as router from '@ngrx/router-store';
import * as user from '../lib/reducers/user';
import * as window from '../lib/reducers/window';

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfiguratorService, MediaSizeBreaks } from '../lib/services/configurator';

import { AppState } from '../reducers';
import { AutoUnsubscribe } from '../lib/decorators/auto-unsubscribe';
import { EnvService } from '../lib/services/env';
import { LifecycleComponent } from '../lib/components/lifecycle-component';
import { NavigatorItem } from '../lib/components/navigator';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { badge } from '../lib/actions/navigator';
import { config } from '../config';
import { nextTick } from '../lib/utils';

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

  new NavigatorItem('/buttons', 'window-restore', 'Buttons & Dialogs', {
    group: 'Components',
    tooltip: 'A gallery of all button, dialog and card styles',
    sticky: true
  }),

  new NavigatorItem('/drawers', 'window-maximize', 'Drawer Panels', {
    group: 'Components',
    tooltip: 'Test page for all drawer styles',
    sticky: true
  }),

  new NavigatorItem('/forms', 'th', 'Polymer Forms', {
    group: 'Components',
    tooltip: 'Test page for forms and all possible components',
    sticky: true
  }),

  new NavigatorItem('/markdown/readthat.md', 'file-text', 'Markdown Test #1', {
    group: 'Components',
    tooltip: 'A basic introduction to part 1 for beginners',
    sticky: true,
    nodeFinders: [
      {selector: 'lib-markdown h1', text: 'Introduction'},
      {selector: 'lib-markdown h3', text: 'Example'},
      {selector: 'lib-markdown h3', text: 'SystemJS Configuration'}
    ]
  }),

  new NavigatorItem('/markdown/readthis.md', 'file-text', 'Markdown Test #2', {
    group: 'Components',
    tooltip: 'Full API spec for advanced programmers',
    sticky: true,
    nodeFinders: [
      {selector: 'lib-markdown h3', text: 'Installation'},
      {selector: 'lib-markdown h3', text: 'Examples'},
      {selector: 'lib-markdown h3', text: 'Introduction'},
      {selector: 'lib-markdown h3', text: 'Setup'},
      {selector: 'lib-markdown h2', text: 'Contributing'}
    ]
  }),

  new NavigatorItem('/pipes', 'filter', 'Miscellaneous Pipes', {
    group: 'Components',
    tooltip: 'Test page for all pipes',
    sticky: true
  }),

  // Google

  new NavigatorItem('/maps', 'map', 'Google Maps', {
    group: 'Google Integrations',
    tooltip: 'Sample Google map with test info window and markers',
    sticky: true
  }),

  new NavigatorItem('/charts', 'area-chart', 'Google Charts', {
    group: 'Google Integrations',
    tooltip: 'Sample Google chart',
    sticky: true
  }),

  // pagination

  new NavigatorItem('/pagination', 'sort-amount-asc', 'All-in-one Test', {
    group: 'Pagination & Sort',
    tooltip: 'Test page for all aspects of pagination',
    sticky: true
  }),

  // reducers

  new NavigatorItem('/user', 'filter', 'User State', {
    group: 'Reducers',
    tooltip: 'Test user state by manual entry of parameters',
    sticky: false
  })

];

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'lib-root',
  templateUrl: 'root.html',
  styleUrls: ['root.less']
})

@AutoUnsubscribe()
export class RootComponent extends LifecycleComponent {

  navigatorState: Observable<navigator.NavigatorState>;
  pageState: Observable<page.PageState>;
  routerState: Observable<router.RouterReducerState>;
  userState: Observable<user.UserState>;
  windowState: Observable<window.WindowState>;

  /** ctor */
  constructor(public configurator: ConfiguratorService,
                     env: EnvService,
                     store: Store<AppState>) {
    super();
    console.log('%c <lib-root> loading', 'color: blue', config, env);
    this.navigatorState = store.select(state => state.navigator);
    this.pageState = store.select(state => state.page);
    this.routerState = store.select(state => state.router);
    this.userState = store.select(state => state.user);
    this.windowState = store.select(state => state.window);
    // configure the app
    nextTick(() => {
      configurator.withMediaSizeBreaks(MEDIA_SIZE_BREAKS);
      configurator.withNavigatorItems(NAVIGATOR_ITEMS);
      // just a test
      store.dispatch(badge('/user', {count: 3, severity: 'error'}));
    });
  }

}
