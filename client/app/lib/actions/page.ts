import { Action } from '@ngrx/store';
import { unique } from '../utils';

export const ActionTypes = {
  NOOP:          unique('[Page] Noop'),
  NUM_RESULTS:   unique('[Page] Set numResults'),
  RESET:         unique('[Page] Reset'),
  STATUS_TEXT:   unique('[Page] Set statusText'),
  TITLE:         unique('[Page] Set title'),
};

export class NoopAction implements Action {
  type = ActionTypes.NOOP;
  constructor(public payload: any = null) { }
}

export class NumResultsAction implements Action {
  type = ActionTypes.NUM_RESULTS;
  constructor(public payload: number) { }
}

export class ResetAction implements Action {
  type = ActionTypes.RESET;
  constructor(public payload: any = null) { }
}

export class StatusTextAction implements Action {
  type = ActionTypes.STATUS_TEXT;
  constructor(public payload: string) { }
}

export class TitleAction implements Action {
  type = ActionTypes.TITLE;
  constructor(public payload: string) { }
}

export type Actions
  = NoopAction
  | NumResultsAction
  | ResetAction
  | StatusTextAction
  | TitleAction;

/**
 * Apply some sugar to the boilerplate to make the actions
 * look a lot more like imperative functions
 */

export function noop(): NoopAction {
  return new NoopAction();
}

export function numResults(count: number): NumResultsAction {
  return new NumResultsAction(count);
}

export function reset(): ResetAction {
  return new ResetAction();
}

export function statusText(text: string): StatusTextAction {
  return new StatusTextAction(text);
}

export function title(text: string): TitleAction {
  return new TitleAction(text);
}
