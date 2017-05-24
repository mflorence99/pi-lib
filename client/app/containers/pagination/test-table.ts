import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';

import { PagedData } from '../../lib/services/paged-datasource';

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

  @Input() working: boolean;
  @Input() page: PagedData;

  @ViewChild('table') table;

}
