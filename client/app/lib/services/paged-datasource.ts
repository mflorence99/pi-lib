import { Injectable } from '@angular/core';

/**
 * Model core data structures
 */

export class PagedData {
  index = 0;
  numItems = 0;
  items: PagedDataItem[] = [];
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

  // TEMP

  xxx(items: PagedDataItem[],
      state: PagedDataState): PagedDataItem[] {
    items.sort((a: PagedDataItem, b: PagedDataItem) => {
      if (a[state.column] < b[state.column])
        return -1 * state.dir;
      else if (a[state.column] > b[state.column])
        return 1 * state.dir;
      else return 0;
    });
    return items.slice(state.index, state.stride);
  }

}
