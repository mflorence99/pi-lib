import { Component } from '@angular/core';
import { flyInOut } from '../animations';

/**
 * Common 404 page
 */

@Component({
  animations: [flyInOut()],
  selector: 'pi-404-page',
  styleUrls: ['404-page.less'],
  templateUrl: '404-page.html'
})

export class FourOhFourPageComponent { }
