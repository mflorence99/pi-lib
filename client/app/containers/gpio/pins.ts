import * as gpio from '../../reducers/gpio-pins';

import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

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
  @HostBinding('style.display') _display = 'block';
  @Input() gpioPinsState: gpio.GPIOPinsState = gpio.initialState;

  pins = new Array(40);

  /** ctor */
  constructor(private store: Store<AppState>) { }

  /** Style the flag container to the right position */
  flagStyle(pin: number): any {
    const x = FLAG_ORIGIN.x + ((pin % 2) * FLAG_STRIDE.h);
    const y = FLAG_ORIGIN.y + (Math.floor(pin / 2) * FLAG_STRIDE.v);
    const cx = FLAG_DIM.w;
    const cy = FLAG_DIM.h;
    return {'left.px': x, 'top.px': y, 'width.px': cx, 'height.px': cy};
  }

  /** Style the light container to the right position */
  lightStyle(pin: number): any {
    const x = LIGHT_ORIGIN.x + ((pin % 2) * LIGHT_STRIDE.h);
    const y = LIGHT_ORIGIN.y + (Math.floor(pin / 2) * LIGHT_STRIDE.v);
    const cx = LIGHT_DIM.w;
    const cy = LIGHT_DIM.h;
    return {'left.px': x, 'top.px': y, 'width.px': cx, 'height.px': cy};
  }

  /** Access pin state */
  state(pin: number): boolean {
    return this.gpioPinsState[String(pin + 1)];
  }

  /** Toggle pin state */
  toggle(pin: number) {
    this.store.dispatch(toggle(String(pin + 1)));
  }

}
 
