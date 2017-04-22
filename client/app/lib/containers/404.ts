import {Component} from '@angular/core';
import {flyInOut} from '../animations';

/**
 * Common 404 page
 */

@Component({
  animations: [flyInOut()],
  selector: 'pi-404',
  styleUrls: ['404.less'],
  templateUrl: '404.html'
})

export class FourOhFourComponent { }
