import { } from '@types/marked';
import 'rxjs/add/observable/from';

import { Component, ElementRef, Input, OnDestroy } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

/** Markdowncomponent */

@Component({
  selector: 'pi-markdown',
  styleUrls: ['markdown.html'],
  templateUrl: 'markdown.html'
})

export class MarkdownComponent implements OnDestroy {

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
          this.cleanup();
          this.element.nativeElement.innerHTML = marked(md);
        });
    }
  }

  // lifecycle methods

  ngOnDestroy() {
    this.cleanup();
  }

  // private methods

  private cleanup() {
    // // clean up crap left over by CodeMirror
    // let junk = null;
    // while (junk = this.window.document.querySelector('.gclp-code-grabber'))
    //   junk.parentNode.removeChild(junk);
  }

}
