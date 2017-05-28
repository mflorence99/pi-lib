import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { PolymerForm } from '../../lib/components/polymer-form';

/**
 * Test controller
 */

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'lib-test-ctrl',
  styleUrls: ['ctrl.less'],
  templateUrl: 'ctrl.html'
})

export class TestCtrlComponent {
  @Output() working = new EventEmitter<boolean>();

  json: string;

  // property accessors / mutators

  @Input() set testData(testData: PolymerForm) {
    if (testData) {
      // simulate long-running submit
      if (testData.submitted) {
        this.working.emit(true);
        setTimeout(() => this.working.emit(false), 2000);
      }
      // convert the test data to json
      this.json = JSON.stringify(testData, null, ' ');
    }
  }

}
