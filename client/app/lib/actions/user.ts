import { Action } from '@ngrx/store';
import { UserState } from '../reducers/user';
import { unique } from '../utils';

export const ActionTypes = {
  INIT:     unique('[User] Init'),
  LOAD:     unique('[User] Load'),
  NEW_USER: unique('[User] New user'),
  NOOP:     unique('[User] Noop')
};

export class InitAction implements Action {
  type = ActionTypes.INIT;
  constructor(public payload: any = null) { }
}

export class LoadAction implements Action {
  type = ActionTypes.LOAD;
  constructor(public payload: UserState) { }
}

export class NewUserAction implements Action {
  type = ActionTypes.NEW_USER;
  constructor(public payload: UserState) { }
}

export class NoopAction implements Action {
  type = ActionTypes.NOOP;
  constructor(public payload: any = null) { }
}

export type Actions
  = InitAction
  | LoadAction
  | NewUserAction
  | NoopAction;

/**
 * Apply some sugar to the boilerplate to make the actions
 * look a lot more like imperative functions
 */

export function init(): InitAction {
  return new InitAction();
}

export function load(state: UserState): LoadAction {
  return new LoadAction(state);
}

export function newUser(state: UserState): NewUserAction {
  return new NewUserAction(state);
}

export function noop(): NoopAction {
  return new NoopAction();
}
