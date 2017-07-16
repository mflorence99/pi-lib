import 'rxjs/add/observable/merge';

import { PagedData, PagedDataItem, PagedDataState } from '../services/paged-datasource';

import { AfterContentInit } from '@angular/core';
import { AutoUnsubscribe } from '../decorators/auto-unsubscribe';
import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { ContentChildren } from '@angular/core';
import { Input } from '@angular/core';
import { LifecycleComponent } from './lifecycle-component';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs/Observable';
import { OnChanges } from '@angular/core';
import { OnInit } from '@angular/core';
import { QueryList } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { SortableColumnComponent } from '../components/sortable-column';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { config } from '../config';
import { nextTick } from '../utils';

/**
 * Sortable, pageable data table encapsulation
 */

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'lib-paged-datatable',
  styleUrls: ['paged-datatable.less'],
  templateUrl: 'paged-datatable.html'
})

@AutoUnsubscribe()
export class PagedDataTableComponent extends LifecycleComponent
                                     implements AfterContentInit, OnChanges, OnInit {

  @ContentChildren(SortableColumnComponent, {descendants: true}) columns: QueryList<SortableColumnComponent>;

  @Input() disabled: boolean;
  @Input() page: PagedData;
  @Input() stickyKey: string;
  @Input() stride = config.pagedDataTableDefaultStride;
  @Input() loading: boolean;
  @Input() width = config.pagedDataTableDefaultWidth;

  model = new PagedDataState();
  selected = new Subject<PagedDataItem>();
  state = new Subject<PagedDataState>();

  private selectedItem: PagedDataItem;
  private changes: Subscription;
  private sortListeners: Subscription;

  /** ctor */
  constructor(private lstor: LocalStorageService) {
    super();
  }

  /** Listen for scroll requests */
  listenForScroll() {
    this.newState(false);
  }

  /** Is ths item selected? */
  isSelected(item: PagedDataItem) {
    return item === this.selectedItem;
  }

  /** Select an item */
  select(item: PagedDataItem) {
    this.selectedItem = item;
    this.selected.next(item? Object.assign(Object.create(item), item) : null);
  }

  /** Sort on a column */
  sort(column: SortableColumnComponent) {
    if (this.stickyKey && column.sticky)
      this.lstor.set(`${this.stickyKey}.state`, this.model);
    this.newState(true);
  }

  // lifecycle methods

  ngAfterContentInit() {
    this.listenForSort();
    this.newState(true);
    // re-listen whenever the columns change
    this.changes = this.columns.changes.subscribe(() => {
      this.sortListeners.unsubscribe();
      this.listenForSort();
      this.newState(true);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['page']) {
      // the page might be telling us that we must reset the index
      if (this.page && (this.page.index !== this.model.index))
        this.model.index = this.page.index;
      // now nothing is selected
      nextTick(() => this.select(null));
    }
  }

  ngOnInit() {
    if (this.stickyKey)
      this.model = <any>this.lstor.get(`${this.stickyKey}.state`) || this.model;
    // but we always start from the beginning
    this.model.index = 0;
    this.model.stride = this.stride;
  }

  // private methods

  private listenForSort() {
    // wire up the sortable columns
    const sorters = this.columns.reduce((acc, column) => {
      column.disabled = this.disabled;
      column.state = this.model;
      acc.push(column.changed);
      return acc;
    }, []);
    this.sortListeners = Observable.merge(...sorters)
      .subscribe((column: SortableColumnComponent) => {
        this.sort(column);
      });
  }

  private newState(reset: boolean) {
    if (reset)
      this.model.index = 0;
    this.state.next(Object.assign(Object.create(this.model), this.model));
  }

}
