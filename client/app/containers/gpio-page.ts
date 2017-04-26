import * as gpio from '../reducers/gpio-pins';

import { AppState } from '../reducers';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { flyInOut } from '../lib/animations';

/**
 * GPIO test page
 */

@Component({
  animations: [flyInOut()],
  selector: 'pi-gpio-page',
  styleUrls: ['gpio-page.less'],
  templateUrl: 'gpio-page.html'
})

export class GPIOPageComponent {
  gpioPinsState: Observable<gpio.GPIOPinsState>;

  /** ctor */
  constructor(store: Store<AppState>) {
    this.gpioPinsState = store.select(state => state.gpio);
  }

}
