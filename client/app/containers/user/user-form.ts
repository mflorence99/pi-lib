import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
import { UserState, initialState } from '../../lib/reducers/user';

/**
 * Test form component
 */

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'lib-user-form',
  styleUrls: ['user-form.less'],
  templateUrl: 'user-form.html'
})

export class UserFormComponent {
  @Input() userState: UserState = initialState;
  @ViewChild('form') form;

}
