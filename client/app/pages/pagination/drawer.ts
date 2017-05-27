import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';

import { TestDataItem } from './datasource';

/**
 * Test drawer component
 */

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'lib-test-drawer',
  styleUrls: ['drawer.less'],
  templateUrl: 'drawer.html'
})

export class TestDrawerComponent {

  @ViewChild('drawer') drawer;
  @ViewChild('form') form;

  private _item: TestDataItem;
  private _saving: boolean;

  // accessors / mutators
  // NOTE: OnChanges seems simpler but didn't work for boolean saving

  @Input() get item() { return this._item; }

  set item(item: TestDataItem) {
    this._item = item;
    if (item)
      this.drawer.open();
  }

  @Input() get saving() { return this._saving; }

  set saving(state: boolean) {
    this._saving = state;
    if (!state)
      this.drawer.close();
  };

}
