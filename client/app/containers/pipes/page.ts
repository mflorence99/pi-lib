import { Component } from '@angular/core';
import { flyInOut } from '../../lib/animations';

/**
 * Pipes demo page
 */

@Component({
  animations: [flyInOut()],
  selector: 'lib-pipes-page',
  styleUrls: ['page.less'],
  templateUrl: 'page.html'
})

export class PipesPageComponent { }
