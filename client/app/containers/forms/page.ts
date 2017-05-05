import { Component } from '@angular/core';
import { flyInOut } from '../../lib/animations';

/**
 * lib-polymer-form demo page
 */

@Component({
  animations: [flyInOut()],
  selector: 'lib-forms-page',
  styleUrls: ['page.less'],
  templateUrl: 'page.html'
})

export class FormsPageComponent { }
