import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { Directive } from '@angular/core';
import { ElementRef } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { HostBinding } from '@angular/core';
import { HostListener } from '@angular/core';
import { Input } from '@angular/core';
import { OnChanges } from '@angular/core';
import { OnInit } from '@angular/core';
import { Output } from '@angular/core';
import { QueryList } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ViewChildren } from '@angular/core';
import { toVaadinItems } from '../utils';

/**
 * lib-multi-selector model
 */

export class MultiSelectorItem {
  label: string;
  value: any;
}

/**
 * libMultiSelectorControl directive
 */

@Directive ({
  selector: '[libMultiSelectorControl]'
})

export class MultiSelectorControlDirective {
  @Input() label: string;

  /** ctor */
  constructor(private element: ElementRef) { }

  // Scroll control into view
  scrollTo() {
    this.element.nativeElement.scrollIntoView(true);
  }

}

/**
 * lib-multi-selector component
 */

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'lib-multi-selector',
  styleUrls: ['multi-selector.less'],
  templateUrl: 'multi-selector.html'
})

export class MultiSelectorComponent implements OnChanges, OnInit {

  @HostBinding('class.in-focus') get inFocus() { return this.focussed; }
  @HostBinding('class.out-of-focus') get outOfFocus() { return !this.focussed; }
  @HostBinding() tabindex = -1;

  @Input() errorMessage = '';
  @Input() items: MultiSelectorItem[] = [];
  @Input() label = '';
  @Input() required = false;
  @Input() separator = '^';

  @Output() change = new EventEmitter<string[]>();

  @ViewChild('proxy') _proxy: ElementRef;
  @ViewChildren(MultiSelectorControlDirective) controls: QueryList<MultiSelectorControlDirective>;

  private focussed: boolean;
  private input: HTMLInputElement;

  /** ctor */
  constructor(private element: ElementRef) { }

  /** Item value changes */
  check(event: any,
        item: MultiSelectorItem) {
    const values = this.input.value? this.input.value.split(this.separator) : [];
    // remove any old value
    const ix = values.indexOf(item.value);
    if (ix !== -1)
      values.splice(ix, 1);
    // add in the new one
    if (event.target.checked)
      values[values.length] = item.value;
    values.sort();
    this.change.emit(values);
    this.input.value = values.join(this.separator);
    this.input.dispatchEvent(new Event('change'));
  }

  /** Clear all selections */
  clear() {
    this.input.value = '';
  }

  /** Inner checkbox gains/loses focus */
  focus(state: boolean) {
    this.focussed = state;
  }

  /** Is this item checked? */
  isChecked(item: MultiSelectorItem): boolean {
    if (this.input.value) {
      const values = this.input.value.split(this.separator);
      return (values.indexOf(item.value) !== -1);
    }
    else return false;
  }

  /** Is this selector invalid? */
  isInvalid(): boolean {
    return this.input.required && !this.input.value;
  }

  /** Scroll to the control referenced by this label */
  scrollTo(label: string) {
    this.controls.some(control => {
      if (control.label === label) {
        control.scrollTo();
        return true;
      }
      else return false;
    });
  }

  // property accessors / mutators

  get labels(): string[] {
    if (this.input.value) {
      const values = this.input.value.split(this.separator);
      return this.items.reduce((result, item) => {
        if (values.indexOf(item.value) !== -1)
          result.push(item.label);
        return result;
      }, []).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
    }
    else return [];
  }

  // listeners

  @HostListener('blur') onBlur() {
    this.focussed = false;
  }

  @HostListener('focus') onFocus() {
    this.focussed = true;
  }

  @HostListener('keydown', ['$event']) onKeyDown(event) {
    this.controls.some(control => {
      // NOTE: event.key doesn't appear to be supported by Firefox,
      // but we can easily live without this feature
      if (control.label.charAt(0).toLowerCase() === event.key) {
        control.scrollTo();
        return true;
      }
      else return false;
    });
  }

  // lifecycle methods

  ngOnChanges(changes: SimpleChanges) {
    if (changes['items']
     && this.items
     && (this.items.length > 0)
     && (typeof this.items[0] === 'string'))
      this.items = toVaadinItems(<any>this.items);
  }

  ngOnInit() {
    this.input = this._proxy.nativeElement;
    this.element.nativeElement._proxy = this.input;
  }

}
