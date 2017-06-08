import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';

import { PagedData } from '../../lib/services/paged-datasource';
import { SelectedColumn } from './selector';

/**
 * Test table component
 */

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'lib-test-table',
  styleUrls: ['table.less'],
  templateUrl: 'table.html'
})

export class TestTableComponent {

  @Input() columns: SelectedColumn[] = [];
  @Input() loading: boolean;
  @Input() page: PagedData;

  @ViewChild('table') table;

}
