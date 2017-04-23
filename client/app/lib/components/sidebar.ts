import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

/**
 * Conmon sidebar.
 *
 */
 
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pi-sidebar',
  styleUrls: ['sidebar.less'],
  templateUrl: 'sidebar.html'
})

export class SidebarComponent {
  @Input() path = '';

  groups: string[] = [];
  items = new SidebarItemMap();

  // property accessors / mutators

  @Input() set sidebar(items: SidebarItem[]) {
    this.items = items.reduce((acc, item) => {
      (acc[item.group] = (acc[item.group] || [])).push(item);
      return acc;
    }, new SidebarItemMap());
    this.groups = Object.keys(this.items);
  }

}

/**
 * Model sidebar item
 */

export class SidebarItem {
  constructor(public group: string,
              public path: string,
              public tag: string) { }
}

export class SidebarItemMap {
  [group: string]: SidebarItem[];
}
