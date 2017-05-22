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
    items.sort((a, b) => {
      const p = (state.dir > 0)? a : b;
      const q = (state.dir > 0)? b : a;
      if (p[state.column] > q[state.column])
        return +1;
      if (q[state.column] > p[state.column])
        return -1;
      else return 0;
    });
    return items.slice(state.index, state.stride);
  }

}
