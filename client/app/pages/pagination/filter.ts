import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';

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

  @Input() loading: boolean;

  @ViewChild('form') form: PolymerFormComponent;

}
