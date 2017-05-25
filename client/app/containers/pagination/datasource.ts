import 'rxjs/add/observable/from';
import 'rxjs/add/operator/delay';

import * as Faker from 'faker';

import { PagedData, PagedDataItem, PagedDataSourceService, PagedDataState } from '../../lib/services/paged-datasource';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PolymerFormValuesMap } from '../../lib/components/polymer-form';

/**
 * Model the test data items
 */

export class TestDataItem extends PagedDataItem {
  amount: number;
  city: string;
  emailAddress: string;
  firstName: string;
  id: string;
  jobTitle: string;
  lastName: string;
  phoneNumber: string;
  state: string;
}

/**
 * Test paged data source services
 */

const TEST_DATASET_SIZE = 503;
const SIMULATED_SERVER_LATENCY = 500;

@Injectable()
export class TestDataSourceService extends PagedDataSourceService {

  private testData: TestDataItem[] = [];

  /** ctor */
  constructor() {
    super();
    for (let i = 0; i < TEST_DATASET_SIZE; i++) {
      const item = new TestDataItem();
      item.amount = Number(Faker.finance.amount());
      item.city = Faker.address.city();
      item.emailAddress = Faker.internet.email();
      item.firstName = Faker.name.firstName();
      item.id = Faker.random.uuid();
      item.jobTitle = Faker.name.jobTitle();
      item.lastName = Faker.name.lastName();
      item.phoneNumber = Faker.phone.phoneNumber();
      item.state = Faker.address.state();
      this.testData[i] = item;
    }
  }

  /** Load data */
  load(state: PagedDataState,
       filter: PolymerFormValuesMap,
       reset: boolean): Observable<PagedData> {
    this.sort(state);
    const filtered = this.filter(filter);
    const page = new PagedData();
    page.index = reset? 0 : state.index;
    page.items = filtered.slice(state.index, state.index + state.stride);
    page.maxItems = filtered.length;
    return Observable.from([page])
      .delay(SIMULATED_SERVER_LATENCY);
  }

  /** Save data */
  save(data: PolymerFormValuesMap): Observable<TestDataItem> {
    const saved = Object.assign(new TestDataItem(), data);
    return Observable.from([saved])
      .delay(SIMULATED_SERVER_LATENCY)
      .do((item: TestDataItem) => {
        const ix = this.testData.findIndex(orig => orig.id === item.id);
        if (ix !== -1)
          this.testData[ix] = item;
        else this.testData.unshift(item);
      });
  }

  // private methods

  private filter(filter: PolymerFormValuesMap) {
    return this.testData.filter((item: PagedDataItem) => {
      let ok = true;
      Object.keys(filter).forEach(key => {
        ok = ok && (item[key].indexOf(filter[key]) > 0);
      });
      return ok;
    });
  }

  private sort(state: PagedDataState) {
    this.testData.sort((a: PagedDataItem, b: PagedDataItem) => {
      if (a[state.column] < b[state.column])
        return -1 * state.dir;
      else if (a[state.column] > b[state.column])
        return 1 * state.dir;
      else return 0;
    });
  }

}
