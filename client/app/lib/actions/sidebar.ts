import { Action } from '@ngrx/store';
import { SidebarState } from '../reducers/sidebar';
import { unique } from '../utils';

export const ActionTypes = {
  INIT:   unique('[Sidebar Group] Init'),
  LOAD:   unique('[Sidebar Group] Load'),
  TOGGLE: unique('[Sidebar Group] Toggle')
};

export class InitAction implements Action {
  type = ActionTypes.INIT;
  constructor(public payload: any = null) { }
}

export class LoadAction implements Action {
  type = ActionTypes.LOAD;
  constructor(public payload: any | SidebarState) { }
}

export class ToggleAction implements Action {
  type = ActionTypes.TOGGLE;
  constructor(public payload: string) { }
}

export type Actions
  = InitAction
  | LoadAction
  | ToggleAction;

/**
 * Apply some sugar to the boilerplate to make the actions
 * look a lot more like imperative functions
 */

export function init(): InitAction {
  return new InitAction();
}

export function load(state: any | SidebarState): LoadAction {
  return new LoadAction(state);
}

export function toggle(group: string): ToggleAction {
  return new ToggleAction(group);
}
