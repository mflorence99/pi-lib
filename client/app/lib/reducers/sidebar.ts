import * as sidebar from '../actions/sidebar';

export interface SidebarState {
  [group: string]: boolean;
};

export const initialState: SidebarState = { };

export function reducer(state = initialState,
                        action: sidebar.Actions): SidebarState {
  switch (action.type) {

    case sidebar.ActionTypes.LOAD:
      return Object.assign({}, action.payload || initialState);

    case sidebar.ActionTypes.TOGGLE:
      return Object.assign({}, state, {[action.payload]: !state[action.payload]});

    default:
      return state;

  }
}
