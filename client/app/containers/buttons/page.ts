import { Component } from '@angular/core';
import { flyInOut } from '../../lib/animations';

/**
 * Buttons & dialogs test page
 */

@Component({
  animations: [flyInOut()],
  selector: 'lib-buttons-page',
  styleUrls: ['page.less'],
  templateUrl: 'page.html'
})

export class ButtonsPageComponent { }
