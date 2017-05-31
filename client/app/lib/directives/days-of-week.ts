import { AfterViewInit, Directive, ElementRef, ViewContainerRef } from '@angular/core';

import { MultiSelectorComponent } from '../components/multi-selector';
import { toVaadinItems } from '../utils';

// THIS IS JUST A TEST DURECTIVE -- DON'T EXPECT ANY USERS

const DAYS_OF_WEEK = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];

/**
 * A directive to support selection of day of week in <vaadin-combo-box>
 */

@Directive ({
  selector: 'vaadin-combo-box[libDaysOfWeek]'
})

export class DaysOfWeekComboDirective {

  /** ctor */
  constructor(element: ElementRef) {
    element.nativeElement.items = toVaadinItems(DAYS_OF_WEEK);
  }

}

/**
 * A directive to support selection of tokens in <lib-multi-selector>
 */

@Directive ({
  selector: 'lib-multi-selector[libDaysOfWeek]'
})

export class DaysOfWeekMultiDirective implements AfterViewInit {

  /** ctor */
  constructor(private vcf: ViewContainerRef) { }

  // lifecyce methids

  ngAfterViewInit() {
    // https://github.com/angular/angular/issues/8277
    const multi: MultiSelectorComponent = (<any>this.vcf)._data.componentView.component;
    multi.items = toVaadinItems(DAYS_OF_WEEK);
  }

}
