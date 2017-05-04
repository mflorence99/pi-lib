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
  public configureMediaSizeBreaks(mediaSizeBreaks: MediaSizeBreaks) {
    this.mediaSizeBreaks.emit(mediaSizeBreaks);
  }

  /** Configure navigator */
  public configureNavigator(navigatorItems: NavigatorItem[]) {
    this.navigatorItems.emit(navigatorItems);
  }

}

/**
 * Model media size breaks
 */

export interface MediaSizeBreaks {
  large?: string;
  medium?: string;
  small?: string;
  tiny?: string;
}
