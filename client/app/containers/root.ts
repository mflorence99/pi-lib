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
import { toggleSidebar } from '../lib/actions/window';

/**
 * pi-lib demo app root
 */

const MEDIA_SIZE_BREAKS: MediaSizeBreaks = {
  large: '(min-width: 1024px)',
  small: '(max-width: 1023px)'
};

const NAVIGATOR_ITEMS: NavigatorItem[] = [
  new NavigatorItem('/home', 'home', 'Welcome!'),
  new NavigatorItem('/buttons', 'window-restore', 'Buttons & Dialogs', 'Components'),
  new NavigatorItem('/charts', 'area-chart', 'Google Charts', 'Components'),
  new NavigatorItem('/drawers', 'window-maximize', 'Drawer Panels', 'Components'),
  new NavigatorItem('/forms', 'th', 'Polymer Forms', 'Components'),
  new NavigatorItem('/markdown', 'code', 'Markdown', 'Components'),
  new NavigatorItem('/pipes', 'filter', 'Miscellaneous Pipes', 'Components')
];

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'lib-root',
  templateUrl: 'root.html',
  styleUrls: ['root.less']
})

@AutoUnsubscribe()
export class RootComponent {
  windowState: Observable<window.WindowState>;

  /** ctor */
  constructor(configurator: ConfiguratorService,
              env: EnvService,
              private store: Store<AppState>) {
    console.log('<lib-root> loading', config, env);
    this.windowState = store.select(state => state.window);
    // configure the app
    setTimeout(() => {
      configurator.withMediaSizeBreaks(MEDIA_SIZE_BREAKS);
      configurator.withNavigatorItems(NAVIGATOR_ITEMS);
    }, 0);
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
