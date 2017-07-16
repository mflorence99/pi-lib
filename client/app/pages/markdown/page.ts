import * as window from '../../lib/reducers/window';

import { ActivatedRoute, Params } from '@angular/router';
import { AfterViewInit, Component, ViewChild } from '@angular/core';

import { AppState } from '../../reducers';
import { AutoUnsubscribe } from '../../lib/decorators/auto-unsubscribe';
import { LifecycleComponent } from '../../lib/components/lifecycle-component';
import { MarkdownComponent } from '../../lib/components/markdown';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

/**
 * Markdown demo page
 */

@Component({
  selector: 'lib-markdown-page',
  styleUrls: ['page.less'],
  templateUrl: 'page.html'
})

@AutoUnsubscribe()
export class MarkdownPageComponent extends LifecycleComponent
                                   implements AfterViewInit {

  @ViewChild('markdown') markdown: MarkdownComponent;

  windowState: Observable<window.WindowState>;

  private subToRoute: Subscription;

  /** ctor */
  constructor(private route: ActivatedRoute,
                      store: Store<AppState>) {
    super();
    this.windowState = store.select(state => state.window);
  }

  // lifecycle methods

  ngAfterViewInit() {
    this.subToRoute = this.route.params
      .subscribe((params: Params) => {
        const asset = params['doc']? params['doc'] : 'readthis.md';
        this.markdown.src = `assets/${asset}`;
      });

  }

}
