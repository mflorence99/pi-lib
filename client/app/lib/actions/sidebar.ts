import { Action } from '@ngrx/store';
import { unique } from '../utils';

export const ActionTypes = {
  CLOSE: unique('[Sidebar Group] Close'),
  OPEN:  unique('[Sidebar Group] Open')
};

export class CloseAction implements Action {
  type = ActionTypes.CLOSE;
  constructor(public payload: string) { }
}

export class OpenAction implements Action {
  type = ActionTypes.OPEN;
  constructor(public payload: string) { }
}

export type Actions
  = CloseAction
  | OpenAction;
