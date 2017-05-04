import * as navigator from '../actions/navigator';

export interface NavigatorState {
  badges?: {
    [path: string]: number;
  };
  expando?: {
    [group: string]: boolean;
  };
};

export const initialState: NavigatorState = {
  badges: {},
  expando: {}
};

export function reducer(state = initialState,
                        action: navigator.Actions): NavigatorState {
  switch (action.type) {

    case navigator.ActionTypes.BADGE:
      const badges = Object.assign({}, state.badges, {[action.payload.path]: action.payload.count});
      return Object.assign({}, state, {badges});

    case navigator.ActionTypes.EXPANDO:
      const expando = Object.assign({}, state.expando, {[action.payload]: !state.expando[action.payload]});
      return Object.assign({}, state, {expando});

    case navigator.ActionTypes.LOAD:
      return Object.assign({}, initialState, action.payload);

    default:
      return state;

  }
}
