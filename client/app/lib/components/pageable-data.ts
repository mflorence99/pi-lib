import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { PagedData, PagedDataState } from '../services/paged-datasource';

import { nextTick } from '../utils';

/**
 * Paginator control for paged-datatable
 */

const MAX_PAGES = 99;

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'lib-pageable-data',
  styleUrls: ['pageable-data.less'],
  templateUrl: 'pageable-data.html'
})

export class PageableDataComponent implements OnChanges {

  @Input() page: PagedData;
  @Input() disabled: boolean;
  @Input() state: PagedDataState;

  @Output() changed = new EventEmitter<PageableDataComponent>();

  @ViewChild('numbers') numbers;

  pages: number[] = [];

  private priorState = {
    index: 0,
    maxItems: 0,
    stride: 0
  };

  /** First signalled */
  first() {
    this.scroll(0);
  }

  /** Last signalled */
  last() {
    this.scroll(this.lastIndex());
  }

  /** Next signalled */
  next() {
    this.scroll(Math.min(this.lastIndex(), this.state.index + this.state.stride));
  }

  /** Page number of a given index */
  pageNum(clamped = true) {
    try {
      let num = this.state.index / this.state.stride;
      if ((this.state.index % this.state.stride) !== 0)
        num += 1;
      return clamped? Math.min(this.pages.length - 1, Math.floor(num)) : Math.floor(num);
    }
    catch (ignored) { return 0; }
  }

  /** Total number of pages */
  numPages() {
    try {
      let num = this.page.maxItems / this.state.stride;
      if ((this.page.maxItems % this.state.stride) !== 0)
        num += 1;
      return Math.floor(num);
    }
    catch (ignored) { return 0; }
  }

  /** Previous signalled */
  prev() {
    this.scroll(Math.max(0, this.state.index - this.state.stride));
  }

  // lifecycle methods

  ngOnChanges(changes: SimpleChanges) {
    if (this.page && this.state) {
      if ((this.page.maxItems !== this.priorState.maxItems)
       || (this.state.stride !== this.priorState.stride)) {
        this.pages = new Array(Math.min(MAX_PAGES, this.numPages()));
        this.shift();
      }
      if (this.state.index !== this.priorState.index)
        this.shift();
      // all set for next time
      this.priorState = {
        index: this.state.index,
        maxItems: this.page.maxItems,
        stride: this.state.stride
      };
    }
  }

  // private methods

  private lastIndex() {
    let index = Math.floor(this.page.maxItems / this.state.stride) * this.state.stride;
    if (index === this.page.maxItems)
      index -= this.state.stride;
    return index;
  }

  private scroll(index: number) {
    if (!this.disabled) {
      this.state.index = index;
      this.changed.emit(this);
    }
  }

  private shift() {
    nextTick(() => {
      const divs = this.numbers? this.numbers.nativeElement.querySelectorAll('div') : null;
      if (divs && divs.length) {
        let ix = 0, offset = 0;
        for ( ; ix < this.pageNum(); ix++)
          offset += divs[ix].offsetWidth;
        offset += divs[this.pageNum()].offsetWidth / 2;
        const xlate = (this.numbers.nativeElement.offsetWidth / 2) - offset;
        this.numbers.nativeElement.style.transform = `translateX(${xlate}px)`;
      }
    });
  }

}
