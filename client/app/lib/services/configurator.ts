import 'rxjs/add/operator/startWith';

import { Injectable } from '@angular/core';
import { NavigatorItem } from '../components/navigator';
import { Subject } from 'rxjs/Subject';

/**
 * Provides configuraton settings for pi-lib components.
 */

@Injectable()
export class ConfiguratorService {

  mediaSizeBreaks = new Subject<MediaSizeBreaks>();
  navigatorItems = new Subject<NavigatorItem[]>();

  private alreadyAppended = {};
  private theNavigatorItems: NavigatorItem[] = [];

  /** Configure media size breaks */
  withMediaSizeBreaks(mediaSizeBreaks: MediaSizeBreaks) {
    this.mediaSizeBreaks.next(mediaSizeBreaks);
  }

  /** Configure navigator */

  withNavigatorItems(navigatorItems: NavigatorItem[]) {
    this.alreadyAppended = {};
    this.theNavigatorItems = navigatorItems;
    this.navigatorItems.next(this.theNavigatorItems);
  }

  appendNavigatorItems(navigatorName: string,
                       navigatorItems: NavigatorItem[]) {
    if (!this.alreadyAppended[navigatorName]) {
      this.alreadyAppended[navigatorName] = true;
      this.theNavigatorItems = this.theNavigatorItems.concat(navigatorItems);
      this.navigatorItems.next(this.theNavigatorItems);
    }
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
