import { Action } from '@ngrx/store';
import { GPIOPinsState } from '../reducers/gpio-pins';
import { unique } from '../lib/utils';

export const ActionTypes = {
  LOAD:   unique('[GPIO Pins] Load'),
  NOOP:   unique('[GPIO Pins] Noop'),
  TOGGLE: unique('[GPIO Pins] Toggle')
};

export class LoadAction implements Action {
  type = ActionTypes.LOAD;
  constructor(public payload: any | GPIOPinsState) { }
}

export class NoopAction implements Action {
  type = ActionTypes.NOOP;
  constructor(public payload: any = null) { }
}

export class ToggleAction implements Action {
  type = ActionTypes.TOGGLE;
  constructor(public payload: string) { }
}

export type Actions
  = LoadAction
  | NoopAction
  | ToggleAction;

/**
 * Apply some sugar to the boilerplate to make the actions
 * look a lot more like imperative functions
 */

export function load(state: any | GPIOPinsState): LoadAction {
  return new LoadAction(state);
}

export function noop(): NoopAction {
  return new NoopAction();
}

export function toggle(pin: string): ToggleAction {
  return new ToggleAction(pin);
}
