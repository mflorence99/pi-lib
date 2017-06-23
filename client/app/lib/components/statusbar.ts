import * as page from '../reducers/page';

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

/**
 * Status bar component
 */

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'lib-statusbar',
  templateUrl: 'statusbar.html',
  styleUrls: ['statusbar.less']
})

export class StatusbarComponent {
  @Input() pageState: page.PageState = page.initialState;

  statusLevel = page.StatusLevel;

}
