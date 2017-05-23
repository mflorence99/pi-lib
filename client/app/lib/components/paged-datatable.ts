import 'rxjs/add/observable/merge';

import { AfterContentInit } from '@angular/core';
import { AutoUnsubscribe } from '../decorators/auto-unsubscribe';
import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { ContentChildren } from '@angular/core';
import { Input } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs/Observable';
import { OnInit } from '@angular/core';
import { PagedDataState } from '../services/paged-datasource';
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
export class PagedDataTableComponent implements AfterContentInit, OnInit {

  @ContentChildren(SortableColumnComponent) columns: QueryList<SortableColumnComponent>;

  @Input() stickyKey: string;
  @Input() stride = 100;

  state = new Subject<PagedDataState>();

  private changes: Subscription;
  private listeners: Subscription;
  private model = new PagedDataState();

  /** ctor */
  constructor(private lstor: LocalStorageService) {}

  // lifecycle methods

  ngAfterContentInit() {
    this.listen();
    this.next();
    // re-listen whenever the columns change
    this.changes = this.columns.changes.subscribe(() => {
      this.listeners.unsubscribe();
      this.listen();
      this.next();
    });
  }

  ngOnInit() {
    if (this.stickyKey)
      this.model = <any>this.lstor.get(`${this.stickyKey}.state`);
    // but we always start from the beginning
    this.model.index = 0;
    this.model.stride = this.stride;
  }

  // private methods

  private listen() {
    // wire up the sortable columns
    const emitters = this.columns.reduce((acc, column) => {
      column.model = this.model;
      acc.push(column.changed);
      return acc;
    }, []);
    this.listeners = Observable.merge(...emitters)
      .subscribe((column: SortableColumnComponent) => {
        // make sort sticky
        if (this.stickyKey && column.sticky)
          this.lstor.set(`${this.stickyKey}.state`, this.model);
        // new sort state whenever column resorted
        this.next();
      });
  }

  private next() {
    this.state.next(Object.assign({}, this.model));
  }

}
