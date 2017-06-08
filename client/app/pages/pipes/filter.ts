import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';

import { PolymerFormComponent } from '../../lib/components/polymer-form';

/**
 * Test filter component
 */

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'lib-test-filter',
  styleUrls: ['filter.less'],
  templateUrl: 'filter.html'
})

export class TestFilterComponent {
  @ViewChild('form') form: PolymerFormComponent;

}
