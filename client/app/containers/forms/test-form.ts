import 'rxjs/add/observable/of';

import { AfterViewInit, ChangeDetectionStrategy, Component, HostBinding, ViewChild } from '@angular/core';

import { Form } from '../../lib/components/form';
import { Observable } from 'rxjs/Observable';

/**
 * Test form component
 */

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'pi-test-form',
  styleUrls: ['test-form.less'],
  templateUrl: 'test-form.html'
})

export class TestFormComponent implements AfterViewInit {
  @HostBinding('style.display') _display = 'block';
  @ViewChild('form') form;

  stream = Observable.of('');

  // lifecycle methods

  ngAfterViewInit() {
    this.stream = this.form.stream
      .map((form: Form) => JSON.stringify(form, null, ' '));
  }

}
