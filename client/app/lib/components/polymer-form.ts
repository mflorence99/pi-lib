import { AfterContentInit } from '@angular/core';
import { AutoUnsubscribe } from '../decorators/auto-unsubscribe';
import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { ContentChildren } from '@angular/core';
import { Directive } from '@angular/core';
import { ElementRef } from '@angular/core';
import { HostListener } from '@angular/core';
import { Input } from '@angular/core';
import { LifecycleComponent } from './lifecycle-component';
import { LocalStorageService } from 'angular-2-local-storage';
import { OnChanges } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { QueryList } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { nextTick } from '../utils';

/**
 * lib-polymer-form model
 */

export class PolymerForm {
  isValid = false;
  submitted = false;
  validities = new PolymerFormValiditiesMap();
  values = new PolymerFormValuesMap();
}

export class PolymerFormValiditiesMap {
  [s: string]: boolean;
}

export class PolymerFormValuesMap {
  [s: string]: boolean | number | string;
}

/**
 * libPolymerControl directive
 */

export enum Control {CHECKBOX, COMBOBOX, DATE, HIDDEN, INPUT, MULTI, RADIO, SLIDER, TOGGLE}

export type ListenerCallback = (control: PolymerControlDirective) => void;

@Directive ({
  selector: '[libPolymerControl]'
})

export class PolymerControlDirective implements OnDestroy {
  @Input('default') dflt: boolean | number | string;
  @Input() name: string;
  @Input() sticky: boolean;

  private ctrl: Control;
  private el: any;
  private evtNames: string[] = [];
  private listener: Function;

  // private methods
  private static isEmpty(value: any) {
    // see https://stackoverflow.com/questions/2647867/
    // how-to-determine-if-variable-is-undefined-or-null
    return (value == null) || (value === '');
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
    else if (tagName === 'lib-multi-selector')
      this.ctrl = Control.MULTI;
    else if (tagName === 'paper-radio-group')
      this.ctrl = Control.RADIO;
    else if (tagName === 'paper-slider')
      this.ctrl = Control.SLIDER;
    else if (tagName === 'paper-toggle-button')
      this.ctrl = Control.TOGGLE;
    else throw new Error(`lib-polymer-form <${tagName}> not supported`);
  }

  /** Can this control be sticky? */
  canStick(): boolean {
    switch (this.ctrl) {
      case Control.INPUT:
        const type = this.el.type? this.el.type.toLowerCase() : null;
        return type !== 'password';
      default:
        return true;
    }
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
      case Control.MULTI:
        this.el._proxy.value = null;
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
      case Control.MULTI:
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
            && !(this.el.required && PolymerControlDirective.isEmpty(this.el.value));
      case Control.MULTI:
        return (this.el._proxy.invalid !== true)
            && !(this.el._proxy.required && PolymerControlDirective.isEmpty(this.el._proxy.value));
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
        case Control.MULTI:
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
        // oh oh -- bit of a hack here
        if (this.el._proxy)
          this.el._proxy.addEventListener(evtName, this.listener);
        else this.el.addEventListener(evtName, this.listener);
      });
    }
  }

  /** Unlisten */
  unlisten() {
    if (this.listener) {
      this.evtNames.forEach(evtName => {
        // oh oh -- bit of a hack here
        if (this.el._proxy)
          this.el._proxy.removeEventListener(evtName, this.listener);
        else this.el.removeEventListener(evtName, this.listener);
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
          return PolymerControlDirective.isEmpty(this.el.value)? undefined : Number(this.el.value);
        else return this.el.value;
      case Control.MULTI:
        return this.el._proxy.value;
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
        this.el.value = PolymerControlDirective.isEmpty(data)? null : data;
        break;
      case Control.INPUT:
        if (this.el.type === 'number')
          this.el.value = PolymerControlDirective.isEmpty(data)? null : Number(data);
        else this.el.value = PolymerControlDirective.isEmpty(data)? null : data;
        break;
      case Control.MULTI:
        this.el._proxy.value = PolymerControlDirective.isEmpty(data)? null : data;
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
 * lib-form component
 *
 * Holds Polymer components (line paper-input) in a reactive, potentially
 * dynamic, form.
 */

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'lib-polymer-form',
  styleUrls: ['polymer-form.less'],
  templateUrl: 'polymer-form.html'
})

@AutoUnsubscribe()
export class PolymerFormComponent extends LifecycleComponent
                                  implements AfterContentInit, OnChanges {

  @ContentChildren(PolymerControlDirective, {descendants: true}) controls: QueryList<PolymerControlDirective>;

  @Input() focus: string;
  @Input() initialState: any;
  @Input() preSubmit: boolean;
  @Input() stickyKey: string;

  stream = new Subject<PolymerForm>();

  private changes: Subscription;
  private controlByName = {};
  private model = new PolymerForm();
  private ready: boolean;
  private seed = new PolymerFormValuesMap();

  /** ctor */
  constructor(private lstor: LocalStorageService) {
    super();
  }

  /** Clear a control by name, and optionally give it the focus */
  clear(name: string,
        focus = true) {
    const control = this.controlByName[name];
    if (control) {
      control.clear();
      this.model.values[control.name] = control.value;
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

  /**
   * Re-seed the form by finding every control's default or initial value
   *
   * NOTE: passwords can never be sticky!
   */
  reseed() {
    this.controls.forEach((control: PolymerControlDirective) => {
      if (control.canStick()) {
        if (this.stickyKey && control.sticky)
          this.seed[control.name] = <any>this.lstor.get(`${this.stickyKey}.${control.name}`);
        else if (this.initialState)
          this.seed[control.name] = this.initialState[control.name];
      }
      if (this.seed[control.name] == null)
        this.seed[control.name] = control.dflt;
    });
  }

  /** Reset this form */
  reset() {
    this.controlByName = {};
    this.model = new PolymerForm();
    this.controls.forEach((control: PolymerControlDirective) => {
      control.value = this.seed[control.name];
      this.model.values[control.name] = control.value;
      this.model.validities[control.name] = control.isValid();
      if (control.name === this.focus)
        control.focus();
      this.controlByName[control.name] = control;
      control.listen(this.listener.bind(this));
    });
    this.model.isValid = this.isValid();
    this.model.submitted = this.model.isValid && this.preSubmit;
    this.newModel();
  }

  /** Set a control by name */
  set(name: string,
      value: boolean | number | string) {
    const control = this.controlByName[name];
    if (control) {
      control.value = value;
      this.model.values[control.name] = control.value;
    }
  }

  /** Submit this form */
  submit() {
    this.model.isValid = this.isValid();
    this.model.submitted = true;
    this.newModel();
  }

  // listeners

  @HostListener('keydown', ['$event']) onKeyDown(event) {
    if (this.isValid()
     && (event.key === 'Enter')
     && (event.target.tagName.toLowerCase() !== 'paper-textarea'))
      this.submit();
  }

  // lifecycle methods

  ngAfterContentInit() {
    this.reseed();
    nextTick(() => this.reset());
    this.ready = true;
    // reset whenever the list changes
    this.changes = this.controls.changes.subscribe(() => {
      this.reseed();
      nextTick(() => this.reset());
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['initialState'] && this.ready) {
      this.reseed();
      nextTick(() => this.reset());
    }
  }

  // private methods

  private listener(control: PolymerControlDirective) {
    // NOTE: we have to do this because some controls (like DATE)
    // don't set valid at the same time they set value
    nextTick(() => {
      this.model.isValid = this.isValid();
      this.model.submitted = false;
      this.model.values[control.name] = control.value;
      this.model.validities[control.name] = control.isValid();
      this.newModel();
      // make value sticky
      if (this.stickyKey
       && control.sticky
       && control.canStick()
       && control.isValid())
        this.lstor.set(`${this.stickyKey}.${control.name}`, control.value);
    });
  }

  private newModel() {
    this.stream.next(Object.assign(Object.create(this.model), this.model));
  }

}
