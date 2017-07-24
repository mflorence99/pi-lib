import * as page from '../actions/page';

export enum StatusLevel {NORMAL, INFO, WARNING, ERROR}

export class PageState {
  numResults: number;
  statusLevel: StatusLevel;
  statusText: string;
  title: string;
}

export const initialState: PageState = {
  numResults: null,
  statusLevel: StatusLevel.NORMAL,
  statusText: null,
  title: null
};

export function reducer(state = initialState,
                        action: page.Actions): PageState {
  switch (action.type) {

    case page.ActionTypes.NUM_RESULTS:
      return Object.assign({}, state, {numResults: action.payload});

    case page.ActionTypes.RESET:
      return Object.assign({}, initialState);

    case page.ActionTypes.STATUS_TEXT:
      return Object.assign({}, state,
        {statusLevel: StatusLevel.NORMAL, statusText: action.payload});

    case page.ActionTypes.STATUS_INFO:
      return Object.assign({}, state,
        {statusLevel: StatusLevel.INFO, statusText: action.payload});

    case page.ActionTypes.STATUS_WARNING:
      return Object.assign({}, state,
        {statusLevel: StatusLevel.WARNING, statusText: action.payload});

    case page.ActionTypes.STATUS_ERROR:
      return Object.assign({}, state,
        {statusLevel: StatusLevel.ERROR, statusText: action.payload});

    case page.ActionTypes.TITLE:
      return Object.assign({}, state, {title: action.payload});

    default:
      return state;

  }
}
