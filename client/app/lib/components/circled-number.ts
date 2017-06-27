import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Gravatar icon
 */

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'lib-circled-number',
  styleUrls: ['circled-number.less'],
  templateUrl: 'circled-number.html'
})

export class CircledNumberComponent { }
