import * as Faker from 'faker';

import { AfterViewInit, ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PagedData, PagedDataItem, PagedDataSourceService, PagedDataState } from '../../lib/services/paged-datasource';

import { Subject } from 'rxjs/Subject';

/**
 * Model the data items
 */

export class TestDataItem extends PagedDataItem {
  amount: number;
  city: string;
  emailAddress: string;
  firstName: string;
  jobTitle: string;
  lastName: string;
  phoneNumber: string;
  state: string;
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

  page = new Subject<PagedData>();

  // TEMP

 testData: TestDataItem[] = [];

  constructor(private dataSource: PagedDataSourceService) {
    for (let i = 0; i < 10; i++) {
      const item = new TestDataItem();
      item.amount = Number(Faker.finance.amount());
      item.city = Faker.address.city();
      item.emailAddress = Faker.internet.email();
      item.firstName = Faker.name.firstName();
      item.jobTitle = Faker.name.jobTitle();
      item.lastName = Faker.name.lastName();
      item.phoneNumber = Faker.phone.phoneNumber();
      item.state = Faker.address.state();
      this.testData[i] = item;
    }
  }

  @Input() set state(state: PagedDataState) {
    if (state) {
      const page = new PagedData();
      page.index = 0;
      page.numItems = this.testData.length;
      page.items = this.dataSource.xxx(this.testData, {column: state.column, dir: state.dir, index: 0, stride: state.stride});
      // we need this because of circular relationship between table & controller
      setTimeout(() => this.page.next(page), 0);
    }
  }

  ngAfterViewInit() {
  }

}
