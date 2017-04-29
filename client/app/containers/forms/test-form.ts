import 'rxjs/add/observable/of';

import { AfterViewInit, ChangeDetectionStrategy, Component, HostBinding, ViewChild } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { PiForm } from '../../lib/components/form';

/**
 * Test form component
 */

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pi-test-form',
  styleUrls: ['test-form.less'],
  templateUrl: 'test-form.html'
})

export class TestFormComponent implements AfterViewInit {
  @HostBinding('style.display') _display = 'block';
  @ViewChild('form') form;

  stream = Observable.of('');
  working = false;

  // lifecycle methods

  ngAfterViewInit() {
    this.stream = this.form.stream
      .map((form: PiForm) => JSON.stringify(form, null, ' '));
  }

}
