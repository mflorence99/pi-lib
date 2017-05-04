import * as window from '../../lib/reducers/window';

import { AppState } from '../../reducers';
import { AutoUnsubscribe } from '../../lib/decorators/auto-unsubscribe';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { flyInOut } from '../../lib/animations';

/**
 * Markdown demo page
 */

@Component({
  animations: [flyInOut()],
  selector: 'pi-markdown-page',
  styleUrls: ['page.less'],
  templateUrl: 'page.html'
})

@AutoUnsubscribe()
export class MarkdownPageComponent {
  windowState: Observable<window.WindowState>;

  /** ctor */
  constructor(store: Store<AppState>) {
    this.windowState = store.select(state => state.window);
  }

}
