import * as window from '../actions/window';

export interface WindowState {
  large: boolean;
  small: boolean;
  withSidebar: boolean;
};

export const initialState: WindowState = {
  large: true,
  small: false,
  withSidebar: true
};

export function reducer(state = initialState,
                        action: window.Actions): WindowState {
  switch (action.type) {

    case window.ActionTypes.GO_LARGE:
      return Object.assign({}, state, {large: true, small: false, withSidebar: true});

    case window.ActionTypes.GO_SMALL:
      return Object.assign({}, state, {large: false, small: true, withSidebar: false});

    case window.ActionTypes.LOAD:
      return Object.assign({}, initialState, action.payload);

    case window.ActionTypes.TOGGLE_SIDEBAR:
      return Object.assign({}, state, {withSidebar: !state.withSidebar});

    default:
      return state;

  }
}
