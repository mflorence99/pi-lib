import * as sidebar from '../actions/sidebar';

export interface SidebarState {
  badges: {
    [path: string]: number;
  };
  expando: {
    [group: string]: boolean;
  };
};

export const initialState: SidebarState = {
  badges: {},
  expando: {}
};

export function reducer(state = initialState,
                        action: sidebar.Actions): SidebarState {
  switch (action.type) {

    case sidebar.ActionTypes.BADGE:
      const badges = Object.assign({}, state.badges, {[action.payload.path]: action.payload.count});
      return Object.assign({}, state, {badges});

    case sidebar.ActionTypes.EXPANDO:
      const expando = Object.assign({}, state.expando, {[action.payload]: !state.expando[action.payload]});
      return Object.assign({}, state, {expando});

    case sidebar.ActionTypes.LOAD:
      return Object.assign({}, initialState, action.payload);

    default:
      return state;

  }
}
