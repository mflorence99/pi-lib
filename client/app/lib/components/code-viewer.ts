import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, ViewChild } from '@angular/core';

import { HighlightJsService } from 'angular2-highlight-js';

/**
 * pi-code-viewer component
 */

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pi-code-viewer',
  styleUrls: ['code-viewer.less'],
  templateUrl: 'code-viewer.html'
})

export class CodeViewerComponent implements AfterViewInit {

  @HostBinding('style.display') _display = 'block';

  @Input() type = 'xml';

  @Input() set code(code: string) {
    if (this.snippet)
      this.fill(code);
    else this.cache = code;
  }

  @ViewChild('snippet') snippet: ElementRef;

  private cache: string;

  /** ctor */
  constructor(private hljs: HighlightJsService) { }

  // lifecycle methods

  ngAfterViewInit() {
    if (this.cache) {
      this.fill(this.cache);
      this.cache = null;
    }
  }

  // private methods

  private fill(code: string) {
    if (code) {
      const el = this.snippet.nativeElement;
      el.innerHTML = code;
      this.hljs.highlight(el);
    }
  }
}
