import { Action } from '@ngrx/store';
import { unique } from '../utils';

export const ActionTypes = {
  INIT: unique('[Router Extended] Init')
};

export class InitAction implements Action {
  type = ActionTypes.INIT;
  constructor(public payload: any = null) { }
}
