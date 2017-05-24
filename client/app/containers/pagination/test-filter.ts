import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';

/**
 * Test filter component
 */

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'lib-test-filter',
  styleUrls: ['test-filter.less'],
  templateUrl: 'test-filter.html'
})

export class TestFilterComponent {
  
  @Input() working: boolean;

  @ViewChild('form') form;

}
