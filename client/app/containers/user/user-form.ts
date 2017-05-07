import 'rxjs/add/observable/of';

import { AfterViewInit, ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
import { UserState, initialState } from '../../lib/reducers/user';

import { Observable } from 'rxjs/Observable';

/**
 * Test form component
 */

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'lib-user-form',
  styleUrls: ['user-form.less'],
  templateUrl: 'user-form.html'
})

export class UserFormComponent implements AfterViewInit {

  @Input() userState: UserState = initialState;

  @ViewChild('form') form;

  stream = Observable.of(null);

  // lifecycle methods

  ngAfterViewInit() {
    this.stream = this.form.stream;
  }

}
