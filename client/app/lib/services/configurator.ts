import 'rxjs/add/operator/startWith';

import { Injectable } from '@angular/core';
import { NavigatorItem } from '../components/navigator';
import { Subject } from 'rxjs/Subject';

/**
 * Provides configuraton settings for pi-lib components.
 */

@Injectable()
export class ConfiguratorService {
  mediaSizeBreaks: Subject<MediaSizeBreaks>;
  navigatorItems: Subject<NavigatorItem[]>;

  /** ctor */
  constructor() {
    this.mediaSizeBreaks = new Subject<MediaSizeBreaks>();
    this.navigatorItems = new Subject<NavigatorItem[]>();
  }

  /** Configure media size breaks */
  public withMediaSizeBreaks(mediaSizeBreaks: MediaSizeBreaks) {
    this.mediaSizeBreaks.next(mediaSizeBreaks);
  }

  /** Configure navigator */
  public withNavigatorItems(navigatorItems: NavigatorItem[]) {
    this.navigatorItems.next(navigatorItems);
  }

}

/**
 * Model media size breaks
 */

export class MediaSizeBreaks {
  large?: string;
  medium?: string;
  small?: string;
  tiny?: string;
}
