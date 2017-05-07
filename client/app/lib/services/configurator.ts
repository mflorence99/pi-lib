import {EventEmitter, Injectable} from '@angular/core';

import { NavigatorItem } from '../components/navigator';

/**
 * Provides configuraton settings for pi-lib components.
 */

@Injectable()
export class ConfiguratorService {

  mediaSizeBreaks = new EventEmitter<MediaSizeBreaks>();
  navigatorItems = new EventEmitter<NavigatorItem[]>();

  /** Configure media size breaks */
  public withMediaSizeBreaks(mediaSizeBreaks: MediaSizeBreaks) {
    this.mediaSizeBreaks.emit(mediaSizeBreaks);
  }

  /** Configure navigator */
  public withNavigatorItems(navigatorItems: NavigatorItem[]) {
    this.navigatorItems.emit(navigatorItems);
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
