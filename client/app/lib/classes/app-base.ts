import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

import { Event, NavigationEnd, Router } from '@angular/router';

import { EnvService } from '../services/env';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs/Observable';
import { unique } from '../utils';

/**
 * App base
 */

const LAST_USED_ROUTE = unique('last-used-route');

export class AppBase {

  route: Observable<string>;

  constructor(config: any,
              env: EnvService,
              lstor: LocalStorageService,
              router: Router,
              dfltRoute: string) {

    // successful startup signature
    console.log(config);
    console.log(env);

    // listen for route changes
    this.route = router.events
      .filter((e: Event) => e instanceof NavigationEnd)
      .filter((e: NavigationEnd) => (e.urlAfterRedirects !== '/'))
      .map((e: NavigationEnd) => e.urlAfterRedirects)
      .do((path: string) => lstor.set(LAST_USED_ROUTE, path));

    // navigate to last-used route
    setTimeout(() => {
      const route = (lstor.get(LAST_USED_ROUTE) || dfltRoute);
      router.navigate([route]);
    }, 0);

  }

}
