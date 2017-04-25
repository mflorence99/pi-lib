import * as sidebar from '../actions/sidebar';

export interface State {
  [group: string]: boolean;
};

export const initialState: State = { };

export function reducer(state = initialState,
                        action: sidebar.Actions): State {
  switch (action.type) {

    case sidebar.ActionTypes.CLOSE:
      return Object.assign({}, state, {[action.payload]: false});

    case sidebar.ActionTypes.OPEN:
      return Object.assign({}, state, {[action.payload]: true});

    default:
      return state;

  }
}
