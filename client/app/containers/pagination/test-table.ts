import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { TestDataPage } from './test-ctrl';

/**
 * Model the page state
 */

export class PageState {
  index = 0;
}

export class SortState {
  column = '';
  dir = 1;
}

/**
 * Test table component
 */

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'lib-test-table',
  styleUrls: ['test-table.less'],
  templateUrl: 'test-table.html'
})

export class TestTableComponent {
  @Input() page = new TestDataPage();

  pageState = new Subject<PageState>();
  sortState = new Subject<SortState>();

}
