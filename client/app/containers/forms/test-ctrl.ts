import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output, ViewChild } from '@angular/core';

import { HighlightJsService } from 'angular2-highlight-js';
import { PolymerForm } from '../../lib/components/polymer-form';

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

  @Output() working = new EventEmitter<boolean>();

  @ViewChild('snippet') snippet;

  /** ctor */
  constructor(private hljs: HighlightJsService) { }

  // property mutator

  @Input() set form(form: PolymerForm) {
    if (form) {
      // simulate long-running submit
      if (form.submitted) {
        this.working.emit(true);
        setTimeout(() => this.working.emit(false), 2000);
      }
      // convert the form to json
      const json = JSON.stringify(form, null, ' ');
      const el = this.snippet.nativeElement;
      el.innerHTML = json
        .replace(/\n/g, '<br>')
        .replace(/ /g, '&nbsp;');
      this.hljs.highlight(el, true);
    }
  }

}
