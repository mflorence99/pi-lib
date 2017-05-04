import { Action } from '@ngrx/store';
import { WindowState } from '../reducers/window';
import { unique } from '../utils';

export const ActionTypes = {
  GO_LARGE:         unique('[Window] Go large'),
  GO_SMALL:         unique('[Window] Go small'),
  INIT:             unique('[Window] Init'),
  LOAD:             unique('[Window] Load'),
  NOOP:             unique('[Window] Noop'),
  TOGGLE_SIDEBAR:   unique('[Window] Toggle sidebar')
};

export class GoLargeAction implements Action {
  type = ActionTypes.GO_LARGE;
  constructor(public payload: any = null) { }
}

export class GoSmallAction implements Action {
  type = ActionTypes.GO_SMALL;
  constructor(public payload: any = null) { }
}

export class InitAction implements Action {
  type = ActionTypes.INIT;
  constructor(public payload: any = null) { }
}

export class LoadAction implements Action {
  type = ActionTypes.LOAD;
  constructor(public payload: any) { }
}

export class NoopAction implements Action {
  type = ActionTypes.NOOP;
  constructor(public payload: any = null) { }
}

export class ToggleSidebarAction implements Action {
  type = ActionTypes.TOGGLE_SIDEBAR;
  constructor(public payload: any = null) { }
}

export type Actions
  = GoLargeAction
  | GoSmallAction
  | InitAction
  | LoadAction
  | NoopAction
  | ToggleSidebarAction;

/**
 * Apply some sugar to the boilerplate to make the actions
 * look a lot more like imperative functions
 */

export function goLarge(): GoLargeAction {
  return new GoLargeAction();
}

export function goSmall(): GoSmallAction {
  return new GoSmallAction();
}

export function init(): InitAction {
  return new InitAction();
}

export function load(state: any | WindowState): LoadAction {
  return new LoadAction(state);
}

export function noop(): NoopAction {
  return new InitAction();
}

export function toggleSidebar(): ToggleSidebarAction {
  return new ToggleSidebarAction();
}
