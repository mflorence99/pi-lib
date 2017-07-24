import * as user from '../actions/user';

export class UserState {
  emailAddress?: string;
  gravatar?: string;
  name?: string;
}

export const initialState: UserState = { };

export function reducer(state = initialState,
                        action: user.Actions): UserState {
  switch (action.type) {

    case user.ActionTypes.LOAD:
    case user.ActionTypes.NEW_USER:
      return Object.assign({}, action.payload || initialState);

    default:
      return state;

  }
}
