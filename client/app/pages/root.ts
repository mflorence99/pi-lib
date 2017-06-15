import * as page from '../lib/reducers/page';
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
    tooltip: 'A gallery of all button, dialog and card styles'
  }),

  new NavigatorItem('/charts', 'area-chart', 'Google Charts', {
    group: 'Components',
    tooltip: 'Sample Google Chart with arbitrary annotations',
    annotations: [
      {style: {color: 'red'}, text: 'GET'},
      {clazz: 'x', text: 'PUT'},
      {style: {color: 'green'}, text: 'DELETE'}
    ]
  }),

  new NavigatorItem('/drawers', 'window-maximize', 'Drawer Panels', {
    group: 'Components',
    tooltip: 'Test page for all drawer styles'
  }),

  new NavigatorItem('/forms', 'th', 'Polymer Forms', {
    group: 'Components',
    tooltip: 'Test page for forms and all possible components'
  }),

  new NavigatorItem('/markdown/readthat.md', 'file-text', 'Markdown Test #1', {
    group: 'Components',
    tooltip: 'A basic introduction to part 1 for beginners',
    nodeFinders: [
      {selector: 'lib-markdown h1', text: 'Introduction'},
      {selector: 'lib-markdown h3', text: 'Example'},
      {selector: 'lib-markdown h3', text: 'SystemJS Configuration'}
    ]
  }),

  new NavigatorItem('/markdown/readthis.md', 'file-text', 'Markdown Test #2', {
    group: 'Components',
    tooltip: 'Full API spec for advanced programmers',
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
    tooltip: 'Test page for all pipes'
  }),

  // pagination

  new NavigatorItem('/pagination', 'sort-amount-asc', 'All-in-one Test', {
    group: 'Pagination & Sort',
    tooltip: 'Test page for all aspects of pagination'
  }),

  // reducers

  new NavigatorItem('/user', 'filter', 'User State', {
    group: 'Reducers',
    tooltip: 'Test user state by manual entry of parameters'
  })

];

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'lib-root',
  templateUrl: 'root.html',
  styleUrls: ['root.less']
})

@AutoUnsubscribe()
export class RootComponent {
  pageState: Observable<page.PageState>;
  routerState: Observable<router.RouterState>;
  userState: Observable<user.UserState>;
  windowState: Observable<window.WindowState>;

  /** ctor */
  constructor(configurator: ConfiguratorService,
              env: EnvService,
              store: Store<AppState>) {
    console.log('%c <lib-root> loading', 'color: blue', config, env);
    this.pageState = store.select(state => state.page);
    this.routerState = store.select(state => state.router);
    this.userState = store.select(state => state.user);
    this.windowState = store.select(state => state.window);
    // configure the app
    nextTick(() => {
      configurator.withMediaSizeBreaks(MEDIA_SIZE_BREAKS);
      configurator.withNavigatorItems(NAVIGATOR_ITEMS);
    });
  }

}
