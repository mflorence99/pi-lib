import { BadgeState, NavigatorState } from '../reducers/navigator';

import { Action } from '@ngrx/store';
import { unique } from '../utils';

export const ActionTypes = {
  BADGE:   unique('[Navigator] Item badge'),
  EXPANDO: unique('[Navigator] Group expando'),
  INIT:    unique('[Navigator] Init'),
  LOAD:    unique('[Navigator] Load'),
  MENU:    unique('[Navigator] Menu'),
  NOOP:    unique('[Navigator] Noop')
};

export class BadgeAction implements Action {
  type = ActionTypes.BADGE;
  constructor(public payload: {path, badge}) { }
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
  constructor(public payload: NavigatorState) { }
}

export class MenuAction implements Action {
  type = ActionTypes.MENU;
  constructor(public payload: {menu, stickyMenu}) { }
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
  | MenuAction
  | NoopAction;

/**
 * Apply some sugar to the boilerplate to make the actions
 * look a lot more like imperative functions
 */

export function badge(path: string,
                      badge: BadgeState): BadgeAction {
  return new BadgeAction({path, badge});
}

export function expando(group: string): ExpandoAction {
  return new ExpandoAction(group);
}

export function init(): InitAction {
  return new InitAction();
}

export function load(state: NavigatorState): LoadAction {
  return new LoadAction(state);
}

export function menu(menu: number,
                     stickyMenu = true): MenuAction {
  return new MenuAction({menu, stickyMenu});
}

export function noop(): NoopAction {
  return new NoopAction();
}
