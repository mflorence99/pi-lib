import { Action } from '@ngrx/store';
import { WindowState } from '../reducers/window';
import { unique } from '../utils';

export const ActionTypes = {
  INIT:             unique('[Window] Init'),
  LOAD:             unique('[Window] Load'),
  MEDIA_BREAK:      unique('[Window] Media break'),
  NOOP:             unique('[Window] Noop'),
  PRINT:            unique('[Window] Print'),
  TOGGLE_SIDEBAR:   unique('[Window] Toggle sidebar')
};

export class InitAction implements Action {
  type = ActionTypes.INIT;
  constructor(public payload: any = null) { }
}

export class LoadAction implements Action {
  type = ActionTypes.LOAD;
  constructor(public payload: WindowState) { }
}

export class MediaBreakAction implements Action {
  type = ActionTypes.MEDIA_BREAK;
  constructor(public payload: WindowState) { }
}

export class NoopAction implements Action {
  type = ActionTypes.NOOP;
  constructor(public payload: any = null) { }
}

export class PrintAction implements Action {
  type = ActionTypes.PRINT;
  constructor(public payload: boolean) { }
}

export class ToggleSidebarAction implements Action {
  type = ActionTypes.TOGGLE_SIDEBAR;
  constructor(public payload: any = null) { }
}

export type Actions
  = InitAction
  | LoadAction
  | MediaBreakAction
  | NoopAction
  | PrintAction
  | ToggleSidebarAction;

/**
 * Apply some sugar to the boilerplate to make the actions
 * look a lot more like imperative functions
 */

export function init(): InitAction {
  return new InitAction();
}

export function load(state: WindowState): LoadAction {
  return new LoadAction(state);
}

export function mediaBreak(state: WindowState): MediaBreakAction {
  return new MediaBreakAction(state);
}

export function noop(): NoopAction {
  return new NoopAction();
}

export function print(printing: boolean): PrintAction {
  return new PrintAction(printing);
}

export function toggleSidebar(): ToggleSidebarAction {
  return new ToggleSidebarAction();
}
