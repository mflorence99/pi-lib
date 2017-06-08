import { } from '@types/marked';
import 'rxjs/add/observable/from';

import { Component, ElementRef, Input } from '@angular/core';
import { Http, Response } from '@angular/http';

import { AutoUnsubscribe } from '../decorators/auto-unsubscribe';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

/** Markdowncomponent */

@Component({
  selector: 'lib-markdown',
  styleUrls: ['markdown.less'],
  templateUrl: 'markdown.html'
})

@AutoUnsubscribe()
export class MarkdownComponent {

  private static cache = {};

  private subToLoader: Subscription;

  /** ctor */
  constructor(private element: ElementRef,
              private http: Http) { }

  // property accessors / mutators

  @Input() set src(uri: string) {
    if (uri) {
      const cached = MarkdownComponent.cache[uri];
      this.subToLoader = (cached? Observable.from([cached]) : this.http.get(uri))
        .do((response: Response) => MarkdownComponent.cache[uri] = response)
        .map((response: Response) => response.text())
        .subscribe((md: string) => {
          this.element.nativeElement.innerHTML = marked(md);
        });
    }
  }

}
