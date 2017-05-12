import { Action } from '@ngrx/store';
import { LaunchURLState } from '../reducers/launch-url';
import { unique } from '../utils';

export const ActionTypes = {
  INIT:             unique('[Launch URL] Init'),
  LOAD:             unique('[Launch URL] Load'),
  NOOP:             unique('[Launch URL] Noop')
};

export class InitAction implements Action {
  type = ActionTypes.INIT;
  constructor(public payload: any = null) { }
}

export class LoadAction implements Action {
  type = ActionTypes.LOAD;
  constructor(public payload: LaunchURLState) { }
}

export class NoopAction implements Action {
  type = ActionTypes.NOOP;
  constructor(public payload: any = null) { }
}

export type Actions
  = InitAction
  | LoadAction
  | NoopAction;

/**
 * Apply some sugar to the boilerplate to make the actions
 * look a lot more like imperative functions
 */

export function init(): InitAction {
  return new InitAction();
}

export function load(state: LaunchURLState): LoadAction {
  return new LoadAction(state);
}

export function noop(): NoopAction {
  return new NoopAction();
}
