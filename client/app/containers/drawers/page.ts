import { Component } from '@angular/core';
import { flyInOut } from '../../lib/animations';

/**
 * lib-drawer-panel demo page
 */

@Component({
  animations: [flyInOut()],
  selector: 'lib-drawers-page',
  styleUrls: ['page.less'],
  templateUrl: 'page.html'
})

export class DrawersPageComponent { }
