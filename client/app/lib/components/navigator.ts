import * as navigator from '../reducers/navigator';
import * as router from '@ngrx/router-store';

import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

import { Store } from '@ngrx/store';
import { expando } from '../actions/navigator';

/**
 * Model navigator
 */

export class NavigatorItem {
  constructor(public path: string,
              public faIcon: string,
              public tag: string,
              public group = '',
              public options: NavigatorItemOptions = {}) { }
}

export interface NavigatorItemOptions {
  something?: boolean;
}

export class NavigatorGroupMap {
  [group: string]: NavigatorItem[];
}

export class NavigatorPathMap {
  [path: string]: NavigatorItem;
}

/**
 * pi-navigator component
 */

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pi-navigator',
  styleUrls: ['navigator.less'],
  templateUrl: 'navigator.html'
})

export class NavigatorComponent {

  @HostBinding('style.display') _display = 'block';

  @Input() navigatorState: navigator.NavigatorState = navigator.initialState;
  @Input() routerState: router.RouterState = router.initialState;

  groups: string[] = [];
  itemsByGroup = new NavigatorGroupMap();
  itemsByPath = new NavigatorPathMap();

  // property accessors / mutators

  @Input() set navigatorItems(items: NavigatorItem[]) {
    this.itemsByGroup = items.reduce((acc, item) => {
      (acc[item.group] = (acc[item.group] || [])).push(item);
      return acc;
    }, new NavigatorGroupMap());
    this.itemsByPath = items.reduce((acc, item) => {
      acc[item.path] = item;
      return acc;
    }, new NavigatorPathMap());
    this.groups = Object.keys(this.itemsByGroup);
  }

}

/**
 * Navigator group.
 */

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pi-navigator-group',
  styleUrls: ['navigator-group.less'],
  templateUrl: 'navigator-group.html'
})

export class NavigatorGroupComponent {

  @HostBinding('style.display') _display = 'block';

  @Input() group = '';
  @Input() items: NavigatorItem[] = [];
  @Input() navigatorState: navigator.NavigatorState = navigator.initialState;
  @Input() routerState: router.RouterState = router.initialState;

  // we should strongly-type the Store, but we can't because it belongs
  // to someone else and we're in a common library
  constructor(private store: Store<any>) { }

  /** Toggle a group open/closed */
  expando(group: string) {
    this.store.dispatch(expando(group));
  }

}
