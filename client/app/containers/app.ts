import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AppBase } from '../lib/classes/app-base';
import { EnvService } from '../lib/services/env';
import { LocalStorageService } from 'angular-2-local-storage';
import { Router } from '@angular/router';
import { SidebarItem } from '../lib/components/sidebar';
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

export class AppComponent extends AppBase {

  sidebar: SidebarItem[] = [
    new SidebarItem('this', '/x', 'noop'),
    new SidebarItem('that', '/y', '404')
  ];

  constructor(env: EnvService,
              lstor: LocalStorageService,
              router: Router) {
    super(config, env, lstor, router, '/x');
  }

}
