import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';

import { HighlightJsService } from 'angular2-highlight-js';

/**
 * lib-code-viewer component
 */

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'lib-code-viewer',
  styleUrls: ['code-viewer.less'],
  templateUrl: 'code-viewer.html'
})

export class CodeViewerComponent implements AfterViewInit {

  @Input() type = 'xml';

  @ViewChild('snippet') snippet: ElementRef;

  private cache: string;

  /** ctor */
  constructor(private hljs: HighlightJsService) { }

  // property accessors / mutators

  @Input() set code(code: string) {
    if (this.snippet)
      this.fill(code);
    else this.cache = code;
  }

  // lifecycle methods

  ngAfterViewInit() {
    if (this.cache) {
      this.fill(this.cache);
      this.cache = null;
    }
  }

  // private methods

  private fill(code: string) {
    const el = this.snippet.nativeElement;
    el.innerHTML = code? code : '';
    this.hljs.highlight(el);
  }
}
