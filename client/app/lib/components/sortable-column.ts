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
  @Input() sticky: boolean;

  @Output() changed = new EventEmitter<SortableColumnComponent>();

  model: PagedDataState;

  /** Sort signalled */
  sort() {
    if (!this.disabled) {
      if (this.model.column !== this.column) {
        this.model.column = this.column;
        this.model.dir = 1;
      }
      else this.model.dir *= -1;
      this.changed.emit(this);
    }
  }

}
