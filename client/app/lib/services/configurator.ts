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

  baseNavigatorItems: NavigatorItem[] = [];

  /** ctor */
  constructor() {
    this.mediaSizeBreaks = new Subject<MediaSizeBreaks>();
    this.navigatorItems = new Subject<NavigatorItem[]>();
  }

  /** Configure media size breaks */
  withMediaSizeBreaks(mediaSizeBreaks: MediaSizeBreaks) {
    this.mediaSizeBreaks.next(mediaSizeBreaks);
  }

  /** Configure navigator */

  withNavigatorItems(navigatorItems: NavigatorItem[]) {
    this.baseNavigatorItems = navigatorItems;
    this.navigatorItems.next(this.baseNavigatorItems);
  }

  appendNavigatorItems(navigatorItems: NavigatorItem[]) {
    this.baseNavigatorItems = this.baseNavigatorItems.concat(navigatorItems);
    this.navigatorItems.next(this.baseNavigatorItems);
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
