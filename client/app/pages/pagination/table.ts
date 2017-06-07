import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';

import { PagedData } from '../../lib/services/paged-datasource';

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

  @Input() fields = [];
  @Input() headers = [];
  @Input() loading: boolean;
  @Input() page: PagedData;

  @ViewChild('table') table;

}
