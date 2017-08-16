import * as navigator from '../actions/navigator';

export class BadgeState {
  count: number;
  severity?: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';
}

export class NavigatorState {
  badges?: {
    [path: string]: BadgeState;
  };
  expando?: {
    [group: string]: boolean;
  };
  menu?: number;
  stickyMenu?: boolean;
}

export const initialState: NavigatorState = {
  badges: {},
  expando: {},
  menu: 0
};

export function reducer(state = initialState,
                        action: navigator.Actions): NavigatorState {
  switch (action.type) {

    case navigator.ActionTypes.BADGE:
      const badges = Object.assign({}, state.badges, {[action.payload.path]: action.payload.badge});
      return Object.assign({}, state, {badges});

    case navigator.ActionTypes.EXPANDO:
      const expando = Object.assign({}, state.expando, {[action.payload]: !state.expando[action.payload]});
      return Object.assign({}, state, {expando});

    case navigator.ActionTypes.LOAD:
      return Object.assign({}, initialState, action.payload);

    case navigator.ActionTypes.MENU:
      return Object.assign({}, state, action.payload);

    default:
      return state;

  }
}
