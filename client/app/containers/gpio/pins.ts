import * as gpio from '../../reducers/gpio-pins';

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { AppState } from '../../reducers';
import { Store } from '@ngrx/store';
import { toggle } from '../../actions/gpio-pins';

/**
 * Demonstrates GPIO pins.
 */

const FLAG_DIM = {w: 240, h: 106};
const FLAG_ORIGIN = {x: 60, y: 132};
const FLAG_STRIDE = {h: 540, v: 120};

const LIGHT_DIM = {w: 116, h: 116};
const LIGHT_ORIGIN = {x: 333, y: 124};
const LIGHT_STRIDE = {h: 120, v: 120};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pi-gpio-pins',
  templateUrl: 'pins.html',
  styleUrls: ['pins.less']
})

export class GPIOPinsComponent {
  @Input() gpioPinsState: gpio.GPIOPinsState = gpio.initialState;

  pins = new Array(40);

  /** ctor */
  constructor(private store: Store<AppState>) { }

  /** Style the flag container to the right position */
  flagStyle(pin: number): any {
    return this.xxxStyle(pin, FLAG_DIM, FLAG_ORIGIN, FLAG_STRIDE);
  }

  /** Style the light container to the right position */
  lightStyle(pin: number): any {
    return this.xxxStyle(pin, LIGHT_DIM, LIGHT_ORIGIN, LIGHT_STRIDE);
  }

  /** Access pin state */
  state(pin: number): boolean {
    return this.gpioPinsState[String(pin + 1)];
  }

  /** Toggle pin state */
  toggle(pin: number) {
    this.store.dispatch(toggle(String(pin + 1)));
  }

  // private methods

  private xxxStyle(pin: number,
                   dim: {w, h},
                   orig: {x, y},
                   stride: {h, v}): any {
    const x = orig.x + ((pin % 2) * stride.h);
    const y = orig.y + (Math.floor(pin / 2) * stride.v);
    const cx = dim.w;
    const cy = dim.h;
    return {'left.px': x, 'top.px': y, 'width.px': cx, 'height.px': cy};
  }

}
