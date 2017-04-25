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

export function close(group: string): CloseAction {
  return new CloseAction(group);
}

export function open(group: string): OpenAction {
  return new OpenAction(group);
}

export type Actions
  = CloseAction
  | OpenAction;
