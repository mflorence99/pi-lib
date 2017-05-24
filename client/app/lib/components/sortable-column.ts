import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { PagedDataState } from '../services/paged-datasource';

/**
 * A sortable column header for tables
 */

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'lib-sortable-column',
  styleUrls: ['sortable-column.less'],
  templateUrl: 'sortable-column.html'
})

export class SortableColumnComponent {

  @Input() column: string;
  @Input() disabled: boolean;
  @Input() state: PagedDataState;
  @Input() sticky: boolean;

  @Output() changed = new EventEmitter<SortableColumnComponent>();


  /** Sort signalled */
  sort() {
    if (!this.disabled) {
      if (this.state.column !== this.column) {
        this.state.column = this.column;
        this.state.dir = 1;
      }
      else this.state.dir *= -1;
      this.changed.emit(this);
    }
  }

}
