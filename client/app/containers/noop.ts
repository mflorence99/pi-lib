import {Component} from '@angular/core';
import {flyInOut} from '../lib/animations';

/**
 * Empty page
 */

@Component({
  animations: [flyInOut()],
  selector: 'pi-noop',
  styleUrls: ['noop.less'],
  templateUrl: 'noop.html'
})

export class NoopComponent { }
