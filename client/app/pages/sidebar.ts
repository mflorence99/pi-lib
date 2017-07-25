import * as navigator from '../lib/reducers/navigator';
import * as router from '@ngrx/router-store';

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ConfiguratorService } from '../lib/services/configurator';

/**
 * Demo app sidebar
 */

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'lib-sidebar',
  templateUrl: 'sidebar.html',
  styleUrls: ['sidebar.less']
})

export class SidebarComponent {

  @Input() navigatorState: navigator.NavigatorState = navigator.initialState;
  @Input() routerState: router.RouterReducerState = <router.RouterReducerState>{};

  /** ctor */
  constructor(public configurator: ConfiguratorService) { }

}
