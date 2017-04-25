import { Action } from '@ngrx/store';
import { unique } from '../utils';

export const ActionTypes = {
  INIT: unique('[Router Extended] Init'),
  NOOP: unique('[Router Extended] Noop')
};

export class InitAction implements Action {
  type = ActionTypes.INIT;
  constructor(public payload: any = null) { }
}

export class NoopAction implements Action {
  type = ActionTypes.NOOP;
  constructor(public payload: any = null) { }
}

export type Actions
  = InitAction
  | NoopAction;

/**
 * Apply some sugar to the boilerplate to make the actions
 * look a lot more like imperative functions
 */

export function init(): InitAction {
  return new InitAction();
}

export function noop(): NoopAction {
  return new NoopAction();
}
