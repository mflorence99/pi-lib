import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { PagedData, PagedDataState } from '../../lib/services/paged-datasource';

import { PolymerForm } from '../../lib/components/polymer-form';
import { Subject } from 'rxjs/Subject';
import { TestDataSourceService } from './test-datasource';

/**
 * Test ctrl component
 */

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'lib-test-ctrl',
  template: ''
})

export class TestCtrlComponent implements OnChanges {

  @Input() filter: PolymerForm;
  @Input() state: PagedDataState;

  @Output() working = new EventEmitter<boolean>();

  page = new Subject<PagedData>();

  /** ctor */
  constructor(private testData: TestDataSourceService) { }

  /** When the filter or state change */
  ngOnChanges(changes: SimpleChanges) {
    if (this.filter && this.filter.submitted && this.state) {
      this.working.emit(true);
      this.testData.load(this.state, this.filter.values, !!changes['filter'])
        .subscribe((page: PagedData) => {
          this.working.emit(false);
          this.page.next(page);
        });
    }
  }

}
