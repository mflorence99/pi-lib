import { } from '@types/marked';
import 'rxjs/add/observable/from';

import { Component, ElementRef, Input } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

/** Markdowncomponent */

@Component({
  selector: 'pi-markdown',
  styleUrls: ['markdown.html'],
  templateUrl: 'markdown.html'
})

export class MarkdownComponent {

  private static cache = {};

  /** ctor */
  constructor(private element: ElementRef,
              private http: Http) { }

  // property accessors / mutators

  @Input() set src(uri: string) {
    if (uri) {
      const cached = MarkdownComponent.cache[uri];
      (cached? Observable.from([cached]) : this.http.get(uri))
        .do((response: Response) => MarkdownComponent.cache[uri] = response)
        .map((response: Response) => response.text())
        .subscribe((md: string) => {
          this.element.nativeElement.innerHTML = marked(md);
        });
    }
  }
  
}
