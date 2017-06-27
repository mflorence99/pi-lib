import 'rxjs/add/observable/from';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PolymerFormValuesMap } from '../components/polymer-form';

/**
 * Model core data structures
 */

export class PagedData {
  index = 0;
  items: PagedDataItem[] = [];
  lookup: any = {};
  maxItems = 0;
}

export class PagedDataItem {
  [s: string]: any;
}

export class PagedDataState {
  column = '';
  dir = 1;
  index = 0;
  stride = 0;
}

/**
 * Base paged data source services
 */

@Injectable()
export class PagedDataSourceService {

  /** ctor */
  constructor() { }

  /** Designed to be overriden */
  load(state: PagedDataState,
       filter: PolymerFormValuesMap,
       reset: boolean): Observable<PagedData> {
    return Observable.from([]);
  }

  /** Designed to be overriden */
  prepare(state: PagedDataState,
          filter: PolymerFormValuesMap,
          reset: boolean): PagedDataState {
    return Object.assign(Object.create(state), {index: reset? 0 : state.index});
  }

}
