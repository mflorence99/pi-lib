import * as router from '@ngrx/router-store';
import * as sidebar from '../reducers/sidebar';

import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { close, open } from '../actions/sidebar';

import { Store } from '@ngrx/store';

/**
 * Common sidebar.
 */

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pi-sidebar',
  styleUrls: ['sidebar.less'],
  templateUrl: 'sidebar.html'
})

export class SidebarComponent {
  @HostBinding('style.display') _display = 'block';
  @Input() routerState: router.RouterState = router.initialState;
  @Input() sidebarState: sidebar.State = sidebar.initialState;

  groups: string[] = [];
  items = new SidebarItemMap();

  // property accessors / mutators

  @Input() set sidebarItems(items: SidebarItem[]) {
    this.items = items.reduce((acc, item) => {
      (acc[item.group] = (acc[item.group] || [])).push(item);
      return acc;
    }, new SidebarItemMap());
    this.groups = Object.keys(this.items);
  }

}

/**
 * Sidebar group.
 */

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pi-sidebar-group',
  styleUrls: ['sidebar-group.less'],
  templateUrl: 'sidebar-group.html'
})

export class SidebarGroupComponent {
  @HostBinding('style.display') _display = 'block';
  @Input() group = '';
  @Input() items: SidebarItem[] = [];
  @Input() routerState: router.RouterState = router.initialState;
  @Input() sidebarState: sidebar.State = sidebar.initialState;

  /** ctor */
  constructor(private store: Store<any>) { }

  /** Toggle a group open/closed */
  toggle(group: string) {
    this.store.dispatch(this.sidebarState[group]? close(group) : open(group));
  }

}

/**
 * Model sidebar item
 */

export class SidebarItem {
  constructor(public group: string,
              public path: string,
              public faIcon: string,
              public tag: string) { }
}

export class SidebarItemMap {
  [group: string]: SidebarItem[];
}
