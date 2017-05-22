import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PagedData, PagedDataState } from '../../lib/services/paged-datasource';

import { Subject } from 'rxjs/Subject';

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
  @Input() page = new PagedData();

  state = new Subject<PagedDataState>();

}
