import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { config } from '../config';

/**
 * A tiny fa-icon button, useful in table rows
 */

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'lib-tiny-button',
  styleUrls: ['tiny-button.less'],
  templateUrl: 'tiny-button.html'
})

export class TinyButtonComponent {
  @Input() faIcon = config.noDataOnPageDefaultIcon;
  @Input() tooltip;

}
