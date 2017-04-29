import { Component } from '@angular/core';
import { flyInOut } from '../../lib/animations';

/**
 * Forms demo page
 */

@Component({
  animations: [flyInOut()],
  selector: 'pi-forms-page',
  styleUrls: ['page.less'],
  templateUrl: 'page.html'
})

export class FormsPageComponent { }
