import 'rxjs/add/observable/merge';

import { PagedData, PagedDataState } from '../services/paged-datasource';

import { AfterContentInit } from '@angular/core';
import { AutoUnsubscribe } from '../decorators/auto-unsubscribe';
import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { ContentChildren } from '@angular/core';
import { Input } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs/Observable';
import { OnChanges } from '@angular/core';
import { OnInit } from '@angular/core';
import { QueryList } from '@angular/core';
import { SortableColumnComponent } from '../components/sortable-column';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

/**
 * Sortable, pageable data table encapsulation
 */

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'lib-paged-datatable',
  styleUrls: ['paged-datatable.less'],
  templateUrl: 'paged-datatable.html'
})

@AutoUnsubscribe()
export class PagedDataTableComponent implements AfterContentInit, OnChanges, OnInit {

  @ContentChildren(SortableColumnComponent) columns: QueryList<SortableColumnComponent>;

  @Input() disabled: boolean;
  @Input() page: PagedData;
  @Input() stickyKey: string;
  @Input() stride = 100;
  @Input() working: boolean;

  state = new Subject<PagedDataState>();

  private changes: Subscription;
  private model = new PagedDataState();
  private sortListeners: Subscription;

  /** ctor */
  constructor(private lstor: LocalStorageService) {}

  /** Listen for scroll requests */
  listenForScroll() {
    this.next(false);
  }

  // lifecycle methods

  ngAfterContentInit() {
    this.listenForSort();
    this.next(true);
    // re-listen whenever the columns change
    this.changes = this.columns.changes.subscribe(() => {
      this.sortListeners.unsubscribe();
      this.listenForSort();
      this.next(true);
    });
  }

  ngOnChanges() {
    // the page might be telling us that we must reset the index
    if (this.page && (this.page.index !== this.model.index))
      this.model.index = this.page.index;
  }

  ngOnInit() {
    if (this.stickyKey)
      this.model = <any>this.lstor.get(`${this.stickyKey}.state`);
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
        // make sort sticky
        if (this.stickyKey && column.sticky)
          this.lstor.set(`${this.stickyKey}.state`, this.model);
        this.next(true);
      });
  }

  private next(reset: boolean) {
    if (reset)
      this.model.index = 0;
    this.state.next(Object.assign({}, this.model));
  }

}
