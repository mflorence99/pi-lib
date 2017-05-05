import { Component } from '@angular/core';
import { flyInOut } from '../../lib/animations';

/**
 * pi-drawer-panel demo page
 */

@Component({
  animations: [flyInOut()],
  selector: 'pi-drawers-page',
  styleUrls: ['page.less'],
  templateUrl: 'page.html'
})

export class DrawersPageComponent { }
