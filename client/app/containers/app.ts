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
    new SidebarItem('Navigation', '/a', 'Dashboard'),
    new SidebarItem('Navigation', '/b', 'Calendar'),
    new SidebarItem('Navigation', '/x', 'Email'),
    new SidebarItem('Components', '/y', 'Layout'),
    new SidebarItem('Components', '/c', 'Table'),
    new SidebarItem('Components', '/y', 'Form'),
    new SidebarItem('Components', '/x', 'Chart')
  ];

  constructor(env: EnvService,
              lstor: LocalStorageService,
              router: Router) {
    super(config, env, lstor, router, '/x');
  }

}
