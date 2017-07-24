import * as window from '../actions/window';

/**
 * NOTE: WindowState is designed to be piped through async into [ngClass]
 * that's why its properties are all booleans, even though some are ordinarily
 * muti=ually exclusive
 */

export class WindowState {
  large?: boolean;
  medium?: boolean;
  small?: boolean;
  tiny?: boolean;
  withPrinter?: boolean;
  withSidebar?: boolean;
}

export const initialState: WindowState = {
  large: false,
  medium: false,
  small: false,
  tiny: false,
  withPrinter: false,
  withSidebar: true
};

export function reducer(state = initialState,
                        action: window.Actions): WindowState {
  switch (action.type) {

    case window.ActionTypes.MEDIA_BREAK:
      const defaultBreaks = {large: false, medium: false, small: false, tiny: false};
      const withSidebar = action.payload.large || action.payload.medium;
      return Object.assign({}, state, defaultBreaks, action.payload, {withSidebar: withSidebar});

    case window.ActionTypes.LOAD:
      return Object.assign({}, initialState, action.payload);

    case window.ActionTypes.PRINT:
      return Object.assign({}, state, {withPrinter: action.payload, withSidebar: (!action.payload && state.withSidebar)});

    case window.ActionTypes.TOGGLE_SIDEBAR:
      return Object.assign({}, state, {withSidebar: !state.withSidebar});

    default:
      return state;

  }
}
