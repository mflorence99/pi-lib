import { } from '@types/marked';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/do';

import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
import { Http, Response } from '@angular/http';

import { AutoUnsubscribe } from '../decorators/auto-unsubscribe';
import { LifecycleComponent } from './lifecycle-component';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

/** Markdowncomponent */

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'lib-markdown',
  styleUrls: ['markdown.less'],
  templateUrl: 'markdown.html'
})

@AutoUnsubscribe()
export class MarkdownComponent extends LifecycleComponent {

  private static cache = {};

  @ViewChild('markdown') markdown;

  content: string;
  loading: boolean;

  private subToLoader: Subscription;

  /** ctor */
  constructor(private http: Http) {
    super();
  }

  // property accessors / mutators

  @Input() set src(uri: string) {
    if (uri) {
      const cached = MarkdownComponent.cache[uri];
      this.subToLoader = (cached? Observable.from([cached]) : this.http.get(uri))
        .do((response: Response) => MarkdownComponent.cache[uri] = response)
        .map((response: Response) => response.text())
        .subscribe((md: string) => {
          this.markdown.nativeElement.innerHTML = marked(md);
        });
    }
  }

}
