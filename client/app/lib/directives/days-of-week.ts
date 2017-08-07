import { AfterViewInit, ChangeDetectorRef, Directive, ElementRef, ViewContainerRef } from '@angular/core';

import { MultiSelectorComponent } from '../components/multi-selector';

// THIS IS JUST A TEST DIRECTIVE -- DON'T EXPECT ANY USERS

const DAYS_OF_WEEK = [
  {label: 'Monday', value: 0},
  {label: 'Tuesday', value: 1},
  {label: 'Wednesday', value: 2},
  {label: 'Thursday', value: 3},
  {label: 'Friday', value: 4},
  {label: 'Saturday', value: 5},
  {label: 'Sunday',  value: 6}
];

const DAYS_OF_WEEK_ALT = [
  {label: 'lundi', value: 0},
  {label: 'mardi', value: 1},
  {label: 'mercredi', value: 2},
  {label: 'jeudi', value: 3},
  {label: 'vendredi', value: 4},
  {label: 'samedi', value: 5},
  {label: 'dimanche',  value: 6}
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
    element.nativeElement.items = DAYS_OF_WEEK;
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
  constructor(private cdf: ChangeDetectorRef,
              private vcf: ViewContainerRef) { }

  // lifecyce methids

  ngAfterViewInit() {
    const choices = [DAYS_OF_WEEK, DAYS_OF_WEEK_ALT];
    let ix = 0;
    const changer = () => {
      // https://github.com/angular/angular/issues/8277
      const multi: MultiSelectorComponent = (<any>this.vcf)._data.componentView.component;
      const choice = choices[ix++ % choices.length];
      multi.items = choice;
      this.cdf.markForCheck();
      // setTimeout(changer, 5000);
    };
    changer();
  }

}
