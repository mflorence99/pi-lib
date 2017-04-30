import { Action } from '@ngrx/store';
import { SidebarState } from '../reducers/sidebar';
import { unique } from '../utils';

export const ActionTypes = {
  BADGE:   unique('[Sidebar] Item badge'),
  EXPANDO: unique('[Sidebar] Group expando'),
  INIT:    unique('[Sidebar] Init'),
  LOAD:    unique('[Sidebar] Load'),
  NOOP:    unique('[Sidebar] Noop')
};

export class BadgeAction implements Action {
  type = ActionTypes.BADGE;
  constructor(public payload: {path, count}) { }
}

export class ExpandoAction implements Action {
  type = ActionTypes.EXPANDO;
  constructor(public payload: string) { }
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

export type Actions
  = BadgeAction
  | ExpandoAction
  | InitAction
  | LoadAction
  | NoopAction;

/**
 * Apply some sugar to the boilerplate to make the actions
 * look a lot more like imperative functions
 */

export function badge(path: string,
                      count: number): BadgeAction {
  return new BadgeAction({path, count});
}

export function expando(group: string): ExpandoAction {
  return new ExpandoAction(group);
}

export function init(): InitAction {
  return new InitAction();
}

export function load(state: any | SidebarState): LoadAction {
  return new LoadAction(state);
}

export function noop(): NoopAction {
  return new NoopAction();
}
