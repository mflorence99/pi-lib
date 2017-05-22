import * as Faker from 'faker';

import { AfterViewInit, ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PageState, SortState } from './test-table';

import { Subject } from 'rxjs/Subject';

/**
 * Model the data items
 */

export class TestDataItem {
  firstName: string;
  lastName: string;
}

export class TestDataPage {
  index = 0;
  numItems = 0;
  items: TestDataItem[] = [];
}

/**
 * Test ctrl component
 */

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'lib-test-ctrl',
  template: ''
})

export class TestCtrlComponent implements AfterViewInit {
  @Input() pageState = new PageState();
  @Input() sortState = new SortState();

  page = new Subject<TestDataPage>();

  private testData: TestDataItem[] = [];

  /** ctor */
  constructor() {
    for (let i = 0; i < 500; i++) {
      const item = new TestDataItem();
      item.firstName = Faker.name.firstName();
      item.lastName = Faker.name.lastName();
      this.testData[i] = item;
    }
  }

  // lifecycle methods

  ngAfterViewInit() {
    const page = new TestDataPage();
    page.index = 0;
    page.numItems = this.testData.length;
    this.sort('lastName', 1);
    page.items = this.testData.slice(1, 100);
    this.page.next(page);
  }

  // private methods

  private sort(column: string,
               dir: number) {
    this.testData.sort((a, b) => {
      const p = (dir > 0)? a : b;
      const q = (dir > 0)? b : a;
      if (p[column] > q[column])
        return +1;
      if (q[column] > p[column])
        return -1;
      else return 0;
    });
  }

}
