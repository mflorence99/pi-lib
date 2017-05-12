import * as launchURL from '../../lib/reducers/launch-url';

import { AppState } from '../../reducers';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

/**
 * Splash page
 */

@Component({
  selector: 'lib-splash-page',
  styleUrls: ['page.less'],
  templateUrl: 'page.html'
})

export class SplashPageComponent {
  launchURL: Observable<launchURL.LaunchURLState>;

  /** ctor */
  constructor(store: Store<AppState>) {
    this.launchURL = store.select(state => state.launchURL);
  }

}
