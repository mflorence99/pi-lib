import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { PolymerForm } from '../../lib/components/polymer-form';

/**
 * Test controller
 */

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'lib-test-ctrl',
  styleUrls: ['test-ctrl.less'],
  templateUrl: 'test-ctrl.html'
})

export class TestCtrlComponent {
  @Output() working = new EventEmitter<boolean>();

  json: string;

  // property accessors / mutators

  @Input() set form(form: PolymerForm) {
    if (form) {
      // simulate long-running submit
      if (form.submitted) {
        this.working.emit(true);
        setTimeout(() => this.working.emit(false), 2000);
      }
      // convert the form to json
      this.json = JSON.stringify(form, null, ' ');
    }
  }

}
