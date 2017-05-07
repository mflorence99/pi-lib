import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

/**
 * Gravatar icon
 */

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'lib-gravatar',
  styleUrls: ['gravatar.less'],
  templateUrl: 'gravatar.html'
})

export class GravatarComponent {
  @Input() src;

}
