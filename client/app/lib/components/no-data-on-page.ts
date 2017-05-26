import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { config } from '../config';

/**
 * Standard treatment for "no data to display" UI.
 *
 * Offsets text with FontAwesome icon, default fa-info-circle.
 *
 * <lib-no-data-on-page [faIcon]="'bars'">
 *   No data to show here, sorry!
 * </lib-no-data-on-page>
 *
 */

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'lib-no-data-on-page',
  styleUrls: ['no-data-on-page.less'],
  templateUrl: 'no-data-on-page.html'
})

export class NoDataOnPageComponent {
  @Input() faIcon = config.noDataOnPageDefaultIcon;

}
