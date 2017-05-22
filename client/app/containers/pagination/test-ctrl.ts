import * as Faker from 'faker';

import { AfterViewInit, ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PagedData, PagedDataItem, PagedDataSourceService, PagedDataState } from '../../lib/services/paged-datasource';

import { Subject } from 'rxjs/Subject';

/**
 * Model the data items
 */

export class TestDataItem extends PagedDataItem {
  firstName: string;
  lastName: string;
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
  @Input() state = new PagedDataState();

  page = new Subject<PagedData>();

  // TEMP

 testData: TestDataItem[] = [];

  constructor(private dataSource: PagedDataSourceService) {
    for (let i = 0; i < 500; i++) {
      const item = new TestDataItem();
      item.firstName = Faker.name.firstName();
      item.lastName = Faker.name.lastName();
      this.testData[i] = item;
    }
  }

  ngAfterViewInit() {
    const page = new PagedData();
    page.index = 0;
    page.numItems = this.testData.length;
    page.items = this.dataSource.xxx(this.testData, {column: 'lastName', dir: 1, index: 0, stride: 100});
    this.page.next(page);
  }

}
