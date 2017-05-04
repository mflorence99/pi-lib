import { Action } from '@ngrx/store';
import { GPIOPinsState } from '../reducers/gpio-pins';
import { unique } from '../lib/utils';

export const ActionTypes = {
  LOAD:     unique('[GPIO Pins] Load'),
  LISTEN:   unique('[GPIO Pins] Listen'),
  NOOP:     unique('[GPIO Pins] Noop'),
  TOGGLE:   unique('[GPIO Pins] Toggle'),
  UNLISTEN: unique('[GPIO Pins] Unlisten')
};

export class LoadAction implements Action {
  type = ActionTypes.LOAD;
  constructor(public payload: GPIOPinsState) { }
}

export class ListenAction implements Action {
  type = ActionTypes.LISTEN;
  constructor(public payload: any = null) { }
}

export class NoopAction implements Action {
  type = ActionTypes.NOOP;
  constructor(public payload: any = null) { }
}

export class ToggleAction implements Action {
  type = ActionTypes.TOGGLE;
  constructor(public payload: string) { }
}

export class UnlistenAction implements Action {
  type = ActionTypes.UNLISTEN;
  constructor(public payload: any = null) { }
}

export type Actions
  = LoadAction
  | ListenAction
  | NoopAction
  | ToggleAction
  | UnlistenAction;

/**
 * Apply some sugar to the boilerplate to make the actions
 * look a lot more like imperative functions
 */

export function load(state: GPIOPinsState): LoadAction {
  return new LoadAction(state);
}

export function listen(): ListenAction {
  return new ListenAction();
}

export function noop(): NoopAction {
  return new NoopAction();
}

export function toggle(pin: string): ToggleAction {
  return new ToggleAction(pin);
}

export function unlisten(): UnlistenAction {
  return new UnlistenAction();
}
