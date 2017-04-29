import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewChild } from '@angular/core';

import { HighlightJsService } from 'angular2-highlight-js';

/**
 * Test controller
 */

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pi-test-ctrl',
  styleUrls: ['test-ctrl.less'],
  templateUrl: 'test-ctrl.html'
})

export class TestCtrlComponent {
  @HostBinding('style.display') _display = 'block';
  @ViewChild('snippet') snippet;

  /** ctor */
  constructor(private hljs: HighlightJsService) { }

  // property mutator

  @Input() set json(json: string) {
    if (json) {
      const el = this.snippet.nativeElement;
      el.innerHTML = json
        .replace(/\n/g, '<br>')
        .replace(/ /g, '&nbsp;');
      this.hljs.highlight(el, true);
    }
  }

}
