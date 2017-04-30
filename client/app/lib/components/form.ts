import { AfterContentInit } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { ContentChildren } from '@angular/core';
import { Directive } from '@angular/core';
import { ElementRef } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { HostBinding } from '@angular/core';
import { HostListener } from '@angular/core';
import { Input } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { OnDestroy } from '@angular/core';
import { QueryList } from '@angular/core';

/**
 * pi-form model
 */

export class Form {
  isValid = false;
  submitted = false;
  validities = new FormValiditiesMap();
  values = new FormValuesMap();
}

export class FormValiditiesMap {
  [s: string]: boolean;
}

export class FormValuesMap {
  [s: string]: boolean | number | string;
}

/**
 * piControl directive
 *
 * NOTE: we place this before the pi-form component to make its QueryList work
 */

enum Control {CHECKBOX, COMBOBOX, DATE, HIDDEN, INPUT, RADIO, SLIDER, TOGGLE}

type ListenerCallback = (control: ControlDirective) => void;

@Directive ({
  selector: '[piControl]'
})

export class ControlDirective implements OnDestroy {
  @Input('default') dflt: boolean | number | string;
  @Input() name: string;
  @Input() sticky: boolean;

  private ctrl: Control;
  private el: any;
  private evtNames: string[] = [];
  private listener: Function;

  // private methods
  private static isEmpty(value: any) {
    return (value === undefined) || (value === null) || (value === '');
  }

  /** ctor */
  constructor(private element: ElementRef) {
    this.el = this.element.nativeElement;
    const tagName = this.el.tagName.toLowerCase();
    const type = this.el.type? this.el.type.toLowerCase() : null;
    if (tagName === 'paper-checkbox')
      this.ctrl = Control.CHECKBOX;
    else if (tagName === 'vaadin-combo-box')
      this.ctrl = Control.COMBOBOX;
    else if (tagName === 'vaadin-date-picker')
      this.ctrl = Control.DATE;
    else if ((tagName === 'paper-input')
          || (tagName === 'paper-textarea'))
      this.ctrl = Control.INPUT;
    else if ((tagName === 'input') && (type === 'hidden'))
      this.ctrl = Control.HIDDEN;
    else if (tagName === 'paper-radio-group')
      this.ctrl = Control.RADIO;
    else if (tagName === 'paper-slider')
      this.ctrl = Control.SLIDER;
    else if (tagName === 'paper-toggle-button')
      this.ctrl = Control.TOGGLE;
    else throw new Error(`admin-control <${tagName}> not supported`);
  }

  /** Clear the control */
  clear() {
    switch (this.ctrl) {
      case Control.CHECKBOX:
        this.el.checked = false;
        break;
      case Control.COMBOBOX:
      case Control.DATE:
      case Control.HIDDEN:
      case Control.INPUT:
      case Control.SLIDER:
        this.el.value = null;
        break;
      case Control.RADIO:
        this.el.selected = 0;
        break;
      case Control.TOGGLE:
        this.el.active = false;
        break;
    }
  }

  /** Give the control the focus */
  focus() {
    switch (this.ctrl) {
      case Control.CHECKBOX:
      case Control.DATE:
      case Control.RADIO:
      case Control.SLIDER:
      case Control.TOGGLE:
        this.el.focus();
        break;
      case Control.COMBOBOX:
      case Control.INPUT:
        this.el.focus();
        break;
      case Control.HIDDEN:
        break;
    }
  }

  /** Is this control in a valid state? */
  isValid(): boolean {
    switch (this.ctrl) {
      case Control.CHECKBOX:
      case Control.DATE:
      case Control.RADIO:
      case Control.SLIDER:
      case Control.TOGGLE:
        return this.el.invalid !== true;
      case Control.COMBOBOX:
      case Control.HIDDEN:
      case Control.INPUT:
        // NOTE: the initial state of required fields may not set the invalid bit
        return (this.el.invalid !== true)
            && !(this.el.required && ControlDirective.isEmpty(this.el.value));
    }
  }

  /** Listen for changes */
  listen(callback: ListenerCallback) {
    if (!this.listener) {
      let evtNames: string[] = [];
      switch (this.ctrl) {
        case Control.CHECKBOX:
        case Control.COMBOBOX:
        case Control.SLIDER:
        case Control.TOGGLE:
          evtNames = ['change'];
          break;
        case Control.DATE:
          evtNames = ['value-changed'];
          break;
        case Control.HIDDEN:
          evtNames = ['change'];
          break;
        case Control.INPUT:
          evtNames = ['value-changed', 'keydown'];
          break;
        case Control.RADIO:
          evtNames = ['paper-radio-group-changed'];
          break;
      }
      // stash the listener so we can unlisten
      this.evtNames = evtNames;
      this.listener = () => callback(this);
      this.evtNames.forEach(evtName => {
        this.el.addEventListener(evtName, this.listener);
      });
    }
  }

  /** Unlisten */
  unlisten() {
    if (this.listener) {
      this.evtNames.forEach(evtName => {
        this.el.removeEventListener(evtName, this.listener);
      });
      this.listener = null;
    }
  }

  // property accessors / mutators

  get value(): boolean | number | string {
    switch (this.ctrl) {
      case Control.CHECKBOX:
        return this.el.checked;
      case Control.COMBOBOX:
      case Control.DATE:
      case Control.SLIDER:
        return this.el.value;
      case Control.HIDDEN:
        return this.el.value;
      case Control.INPUT:
        if (this.el.type === 'number')
          return ControlDirective.isEmpty(this.el.value)? undefined : Number(this.el.value);
        else return this.el.value;
      case Control.RADIO:
        return this.el.selected;
      case Control.TOGGLE:
        return this.el.active;
    }
  }

  set value(data: boolean | number | string) {
    switch (this.ctrl) {
      case Control.CHECKBOX:
        this.el.checked = data;
        break;
      case Control.COMBOBOX:
      case Control.DATE:
      case Control.HIDDEN:
      case Control.SLIDER:
        this.el.value = data? data : null;
        break;
      case Control.INPUT:
        if (this.el.type === 'number')
          this.el.value = ControlDirective.isEmpty(data)? null : Number(data);
        else this.el.value = data? data : null;
        break;
      case Control.RADIO:
        this.el.selected = data;
        break;
      case Control.TOGGLE:
        this.el.active = data;
        break;
    }
  }

  // lifecycle methods

  ngOnDestroy() {
    this.unlisten();
  }

}

/**
 * pi-form component
 */

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pi-form',
  template: '<ng-content></ng-content>'
})

export class FormComponent implements AfterContentInit {

  @ContentChildren(ControlDirective) controls: QueryList<ControlDirective>;

  @HostBinding('style.display') _display = 'block';

  @Input() focus: string;
  @Input() key: string;

  readonly stream = new EventEmitter<Form>();

  private controlByName = {};
  private model = new Form();
  private ready: boolean;
  private seed = new FormValuesMap();
  private timer = null;

  /** ctor */
  constructor(private lstor: LocalStorageService) { }

  /** Clear a control by name, and optionally give it the focus */
  clear(name: string,
        focus = true) {
    const control = this.controlByName[name];
    if (control) {
      control.clear();
      if (focus)
        control.focus();
    }
  }

  /** Get a control by name */
  get(name: string): boolean | number | string {
    const control = this.controlByName[name];
    return (control)? control.value : null;
  }

  /** Is this form in a valid state? */
  isValid(): boolean {
    return this.ready && this.controls.reduce((result, control) => {
      return result && control.isValid();
    }, true);
  }

  /** Reseed the form by finding every control's default or initial value */
  reseed() {
    this.controls.forEach((control: ControlDirective) => {
      if (!this.seed[control.name] && this.key && control.sticky)
        this.seed[control.name] = <any>this.lstor.get(`${this.key}.${control.name}`);
      if (!this.seed[control.name])
        this.seed[control.name] = control.dflt;
    });
  }

  /** Reset this form */
  reset() {
    this.controlByName = {};
    this.model = new Form();
    this.controls.forEach((control: ControlDirective) => {
      control.value = this.seed[control.name];
      this.model.values[control.name] = control.value;
      this.model.validities[control.name] = control.isValid();
      if (control.name === this.focus)
        control.focus();
      this.controlByName[control.name] = control;
      control.listen(this.listener.bind(this));
    });
    this.model.isValid = this.isValid();
    this.stream.emit(this.model);
  }

  /** Set a control by name */
  set(name: string,
      value: boolean | number | string) {
    const control = this.controlByName[name];
    if (control)
      control.value = value;
  }

  /** Submit this form */
  submit() {
    this.model.isValid = this.isValid();
    this.model.submitted = true;
    this.stream.emit(this.model);
  }

  // listeners

  @HostListener('keydown', ['$event']) onKeyDown(event) {
    if (this.isValid()
     && (event.key === 'Enter')
     && (event.target.tagName.toLowerCase() !== 'paper-textarea')) {
      // we will have emitted data for the keydown inside whatever control
      // the user was in when they hit ENTER -- we don't need it now
      if (this.timer)
        clearTimeout(this.timer);
      this.submit();
    }
  }

  // lifecycle methods

  ngAfterContentInit() {
    this.reseed();
    this.reset();
    this.ready = true;
    // reset whenever the list changes
    this.controls.changes.subscribe(() => {
      this.reseed();
      this.reset();
    });
  }

  // private methods

  private listener(control: ControlDirective) {
    // NOTE: we have to do this because some controls (like DATE)
    // don't set valid at the same time they set value
    this.timer = setTimeout(() => {
      this.model.isValid = this.isValid();
      this.model.submitted = false;
      this.model.values[control.name] = control.value;
      this.model.validities[control.name] = control.isValid();
      this.stream.emit(this.model);
      // make value sticky
      if (this.key && control.sticky && control.isValid())
        this.lstor.set(`${this.key}.${control.name}`, control.value);
    }, 0);
  }

}
