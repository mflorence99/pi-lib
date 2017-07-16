import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { PagedData, PagedDataState } from '../../lib/services/paged-datasource';
import { TestDataItem, TestDataSourceService } from './datasource';
import { numResults, statusText } from '../../lib/actions/page';

import { AppState } from '../../reducers';
import { AutoUnsubscribe } from '../../lib/decorators/auto-unsubscribe';
import { LifecycleComponent } from '../../lib/components/lifecycle-component';
import { OnChange } from '../../lib/decorators/onchange';
import { PolymerForm } from '../../lib/components/polymer-form';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { nextTick } from '../../lib/utils';

/**
 * Test ctrl component
 */

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'lib-test-ctrl',
  template: ''
})

@AutoUnsubscribe()
export class TestCtrlComponent extends LifecycleComponent {

  @Input() filter: PolymerForm;
  @Input() state: PagedDataState;
  @Input() update: PolymerForm;

  @Output() loading = new EventEmitter<boolean>();
  @Output() saving = new EventEmitter<boolean>();

  page = new Subject<PagedData>();

  private subToLoader: Subscription;
  private subToSaver: Subscription;

  /** ctor */
  constructor(private store: Store<AppState>,
              private testData: TestDataSourceService) {
    super();
  }

  // bind OnChange handlers

  @OnChange('filter', 'state') load(changed: boolean[]) {
    const reset = changed[0];
    if (this.filter && this.filter.submitted && this.state) {
      nextTick(() => this.store.dispatch(statusText('Loading test data ... please standby')));
      this.loading.emit(true);
      // cancel any prior request
      if (this.subToLoader)
        this.subToLoader.unsubscribe();
      // issue a new load request
      this.subToLoader = this.testData.load(this.state, this.filter.values, reset)
        .subscribe((page: PagedData) => {
          this.store.dispatch(numResults(page.maxItems));
          this.store.dispatch(statusText('Loaded test data'));
          this.loading.emit(false);
          this.page.next(page);
        });
    }
  }

  @OnChange('update') save() {
    if (this.update && this.update.submitted) {
      nextTick(() => this.store.dispatch(statusText(`Saving item ${this.update.values.id} ... please standby`)));
      this.saving.emit(true);
      // cancel any prior request
      if (this.subToSaver)
        this.subToSaver.unsubscribe();
      // issue a new load request
      this.subToSaver = this.testData.save(this.update.values)
        .subscribe((item: TestDataItem) => {
          this.store.dispatch(statusText(`Saved item ${this.update.values.id}`));
          this.saving.emit(false);
          this.load([false]);
        });
    }
  }

}
