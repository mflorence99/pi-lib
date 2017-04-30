import * as router from '@ngrx/router-store';
import * as sidebar from '../reducers/sidebar';

import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

import { Store } from '@ngrx/store';
import { expando } from '../actions/sidebar';

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
  @Input() sidebarState: sidebar.SidebarState = sidebar.initialState;

  groups: string[] = [];
  itemsByGroup = new SidebarGroupMap();
  itemsByPath = new SidebarPathMap();

  // property accessors / mutators

  @Input() set sidebarItems(items: SidebarItem[]) {
    this.itemsByGroup = items.reduce((acc, item) => {
      (acc[item.group] = (acc[item.group] || [])).push(item);
      return acc;
    }, new SidebarGroupMap());
    this.itemsByPath = items.reduce((acc, item) => {
      acc[item.path] = item;
      return acc;
    }, new SidebarPathMap());
    this.groups = Object.keys(this.itemsByGroup);
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
  @Input() sidebarState: sidebar.SidebarState = sidebar.initialState;

  // we should strongly-type the Store, but we can't because it belongs
  // to someone else and we're in a common library
  constructor(private store: Store<any>) { }

  /** Toggle a group open/closed */
  expando(group: string) {
    this.store.dispatch(expando(group));
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

export class SidebarGroupMap {
  [group: string]: SidebarItem[];
}

export class SidebarPathMap {
  [path: string]: SidebarItem;
}
