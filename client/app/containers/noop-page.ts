import { Component } from '@angular/core';
import { flyInOut } from '../lib/animations';

/**
 * Empty page
 */

@Component({
  animations: [flyInOut()],
  selector: 'pi-noop-page',
  styleUrls: ['noop-page.less'],
  templateUrl: 'noop-page.html'
})

export class NoopPageComponent { }
