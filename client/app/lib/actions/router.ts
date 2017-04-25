import { Action } from '@ngrx/store';
import { unique } from '../utils';

export const ActionTypes = {
  INIT: unique('[Router Extended] Init')
};

export class InitAction implements Action {
  type = ActionTypes.INIT;
  constructor(public payload: any = null) { }
}

export type Actions
  = InitAction;

/**
 * Apply some sugar to the boilerplate to make the actions
 * look a lot more like imperative functions
 */

export function init(): InitAction {
  return new InitAction();
}
