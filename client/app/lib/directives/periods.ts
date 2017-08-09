import { Directive, ElementRef, Input } from '@angular/core';

const MINUTES = [
    {label: '15 mins', value: '15'},
    {label: '30 mins', value: '30'},
    {label: '1 hour', value: '60'},
    {label: '3 hours', value: '180'},
    {label: '6 hours', value: '360'},
    {label: '12 hours', value: '720'},
    {label: '24 hours', value: '1440'}
  ];

const MONTHS = [
  {label: 'Next month', value: 'NEXT_MONTH'},
  {label: 'This month', value: 'THIS_MONTH'},
  {label: 'Last month', value: 'LAST_MONTH'}
];

const RECENT = [
  {label: 'Today', value: 'TODAY'},
  {label: 'Yesterday', value: 'YESTERDAY'},
  {label: 'Past 3 days', value: 'PAST_3_DAYS'},
  {label: 'Past 5 days', value: 'PAST_5_DAYS'},
  {label: 'Past 7 days', value: 'PAST_7_DAYS'}
];

const RELATIVE = [
  {label: 'Today', value: 'TODAY'},
  {label: 'Yesterday', value: 'YESTERDAY'},
  {label: 'Past 3 days', value: 'PAST_3_DAYS'},
  {label: 'Past 5 days', value: 'PAST_5_DAYS'},
  {label: 'Past 7 days', value: 'PAST_7_DAYS'},
  {label: 'This week', value: 'THIS_WEEK'},
  {label: 'Last week', value: 'LAST_WEEK'},
  {label: 'This month', value: 'THIS_MONTH'},
  {label: 'Last month', value: 'LAST_MONTH'}
];

/**
 * A directive to support selection of periods in <vaadin-combo-box>
 */

@Directive ({
  selector: 'vaadin-combo-box[libPeriods]'
})

export class PeriodsComboDirective {

  /** ctor */
  constructor(private element: ElementRef) { }

  @Input() set period(type: string) {
    const combobox = this.element.nativeElement;
    switch (type.toLowerCase()) {
      case 'minutes':
        combobox.items = MINUTES;
        break;
      case 'months':
        combobox.items = MONTHS;
        break;
      case 'recent':
        combobox.items = RECENT;
        break;
      case 'relative':
        combobox.items = RELATIVE;
        break;
      default:
        throw new Error(`PeriodsComboDirective ${type} not recognized`);
    }
  }

}
