import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import { PagedData, PagedDataSourceService, PagedDataState } from '../services/paged-datasource';
import { PolymerForm, PolymerFormValuesMap } from './polymer-form';

import { AutoUnsubscribe } from '../decorators/auto-unsubscribe';
import { ExportToCSVComponent } from './export-to-csv';
import { LifecycleComponent } from './lifecycle-component';
import { Subscription } from 'rxjs/Subscription';
import { config } from '../config';
import { nextTick } from '../utils';

/**
 * Exporter control for paged-datatable
 */

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'lib-exportable-data',
  styleUrls: ['exportable-data.less'],
  templateUrl: 'exportable-data.html'
})

@AutoUnsubscribe()
export class ExportableDataComponent extends LifecycleComponent {

  @Input() datasource: PagedDataSourceService;
  @Input() fields: string[] = [];
  @Input() filename: string;
  @Input() filter: PolymerForm;
  @Input() headers: string[] = [];
  @Input() maxItems = 0;
  @Input() page: PagedData;
  @Input() state: PagedDataState;
  @Input() stride = config.pagedDataTableDefaultStride;

  @ViewChild('toCSV') toCSV: ExportToCSVComponent;

  complete = false;
  eta = 0;
  progress = 0;
  ready = true;
  results = [];
  running = false;

  private frozenFilter: PolymerFormValuesMap;
  private frozenState: PagedDataState;
  private subToLoad: Subscription;
  private ts: number;

  /** ctor */
  constructor(private cdf: ChangeDetectorRef) {
    super();
  }

  /** Cancel the export */
  cancel() {
    this.complete = false;
    this.ready = true;
    this.running = false;
    if (this.subToLoad)
      this.subToLoad.unsubscribe();
  }

  /** Download the exported data */
  download() {
    this.complete = false;
    this.ready = true;
    this.running = false;
    this.toCSV.export(this.results);
    this.results = [];
  }

  /** Start the export */
  start() {
    this.complete = false;
    this.eta = 0;
    this.progress = 0;
    this.ready = false;
    this.running = true;
    this.ts = Date.now();
    // inject headers
    this.results = [this.headers];
    // freeze the filter & state and start downloading
    this.frozenFilter = Object.assign({}, this.filter.values);
    this.frozenState = Object.assign({}, this.state, {index: 0});
    if (this.datasource)
      this.step();
    else this.suck();
  }

  // private methods

  private step() {
    this.subToLoad = this.datasource.load(this.frozenState, this.frozenFilter, false)
      .subscribe((page: PagedData) => {
        this.cdf.markForCheck();
        // let's assume we're done
        this.complete = true;
        this.eta = 0;
        this.ready = false;
        this.running = false;
        if (page.items.length > 0) {
          // inject detail
          page.items.forEach(item => {
            const detail = this.fields.reduce((acc, field) => {
              acc.push(item[field]);
              return acc;
            }, []);
            this.results.push(detail);
          });
          // update progress
          this.frozenState.index += this.stride;
          const maxItems = this.maxItems?
            Math.min(this.maxItems, page.maxItems) : page.maxItems;
          this.progress = Math.min(1, (this.frozenState.index / maxItems));
          if (this.frozenState.index < maxItems) {
            // update eta
            const now = Date.now();
            const interval = now - this.ts;
            this.eta = interval * ((maxItems - this.frozenState.index) / this.stride);
            this.ts = now;
            // loop around again
            this.complete = false;
            this.running = true;
            nextTick(() => this.step());
          }
        }
      });
  }

  private suck() {
    this.cdf.markForCheck();
    // eveeything is in the page we were given
    this.complete = true;
    this.eta = 0;
    this.ready = false;
    this.running = false;
    if (this.page.items.length > 0) {
      // inject detail
      this.page.items.forEach(item => {
        const detail = this.fields.reduce((acc, field) => {
          acc.push(item[field]);
          return acc;
        }, []);
        this.results.push(detail);
      });
      // update progress
      this.progress = 1;
    }
  }

}
