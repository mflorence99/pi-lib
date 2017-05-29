import * as page from '../actions/page';

export class PageState {
  numResults: number;
  statusText: string;
  title: string;
};

export const initialState: PageState = {
  numResults: null,
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
      return Object.assign({}, state, {statusText: action.payload});

    case page.ActionTypes.TITLE:
      return Object.assign({}, state, {title: action.payload});

    default:
      return state;

  }
}
