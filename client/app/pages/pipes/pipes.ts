import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { PolymerForm } from '../../lib/components/polymer-form';

/**
 * Test pipes component
 */

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'lib-test-pipes',
  styleUrls: ['pipes.less'],
  templateUrl: 'pipes.html'
})

export class TestPipesComponent {

  date: number;
  header = Array(7);
  now = Date.now();
  number: number;
  selected: string;
  valid: boolean;

  @Input() set filter(filter: PolymerForm) {
    if (filter && filter.submitted) {
      this.date = Date.parse(<string>filter.values.date);
      this.number = <number>filter.values.number;
      this.valid = true;
    }
  }

  /** Annotate selected row */
  annotate(...h: string[]) {
    this.selected = h[0];
    for (let i = 0; i < this.header.length; i++)
      this.header[i] = (i < h.length)? h[i] : '';
  }

}
