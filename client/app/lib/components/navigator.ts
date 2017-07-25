import * as navigator from '../reducers/navigator';
import * as page from '../actions/page';
import * as router from '@ngrx/router-store';

import { AfterViewInit, ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { expando } from '../actions/navigator';

/**
 * Model navigator
 */

export class NavigatorItem {

  constructor(public path: string,
              public faIcon: string,
              public tag: string,
              public options: NavigatorItemOptions = {}) { }

}

export class NavigatorItemAnnotation {
  clazz?: string;
  style?: any;
  text: string;
}

export class NavigatorItemNodeFinder {
  selector: string;
  text: string;
}

export class NavigatorItemOptions {
  group?: string;
  annotations?: NavigatorItemAnnotation[];
  nodeFinders?: NavigatorItemNodeFinder[];
  sticky?: boolean;
  tooltip?: string;
}

export class NavigatorGroupMap {
  [group: string]: NavigatorItem[];
}

export class NavigatorPathMap {
  [path: string]: NavigatorItem;
}

/**
 * lib-navigator component
 */

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'lib-navigator',
  styleUrls: ['navigator.less'],
  templateUrl: 'navigator.html'
})

export class NavigatorComponent {

  @Input() navigatorState: navigator.NavigatorState;
  @Input() routerState: router.RouterReducerState;

  groups: string[] = [];
  itemsByGroup = new NavigatorGroupMap();
  itemsByPath = new NavigatorPathMap();

  // property accessors / mutators

  @Input() set navigatorItems(items: NavigatorItem[]) {
    if (items) {
      this.itemsByGroup = items.reduce((acc, item) => {
        const group = item.options.group || '';
        (acc[group] = (acc[group] || [])).push(item);
        return acc;
      }, new NavigatorGroupMap());
      this.itemsByPath = items.reduce((acc, item) => {
        acc[item.path] = item;
        return acc;
      }, new NavigatorPathMap());
      this.groups = Object.keys(this.itemsByGroup);
    }
  }

}

/**
 * Navigator group.
 */

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'lib-navigator-group',
  styleUrls: ['navigator-group.less'],
  templateUrl: 'navigator-group.html'
})

export class NavigatorGroupComponent {

  @Input() group = '';
  @Input() items: NavigatorItem[] = [];
  @Input() navigatorState: navigator.NavigatorState;
  @Input() routerState: router.RouterReducerState;

  // we should strongly-type the Store, but we can't because it belongs
  // to someone else and we're in a common library
  constructor(private store: Store<any>) { }

  /** Toggle a group open/closed */
  expando(group: string) {
    this.store.dispatch(expando(group));
  }

}

/**
 * Navigator item.
 */

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'lib-navigator-item',
  styleUrls: ['navigator-item.less'],
  templateUrl: 'navigator-item.html'
})

export class NavigatorItemComponent implements AfterViewInit {

  @Input() item: NavigatorItem;
  @Input() navigatorState: navigator.NavigatorState;
  @Input() routerState: router.RouterReducerState;

  // we should strongly-type the Store, but we can't because it belongs
  // to someone else and we're in a common library
  constructor(private routerService: Router,
              private store: Store<any>) { }

  /** Navigate to an item */
  navigate(item: NavigatorItem) {
    console.log('%c Navigate to', 'color: orange', item.path);
    this.routerService.navigate([item.path]);
    this.store.dispatch(page.reset());
    if (item.options.tooltip)
      this.store.dispatch(page.statusText(`${item.tag} ... ${item.options.tooltip}`));
    else this.store.dispatch(page.statusText(item.tag));
    this.store.dispatch(page.title(item.tag));
  }

  // lifecycle methods

  ngAfterViewInit() {
    if (this.routerState && (this.routerState.state.url === this.item.path))
      this.navigate(this.item);
  }

}
