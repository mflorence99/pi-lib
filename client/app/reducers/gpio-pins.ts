import * as gpio from '../actions/gpio-pins';

export interface GPIOPinsState {
  [pin: string]: boolean;
};

export const initialState: GPIOPinsState = { };

export function reducer(state = initialState,
                        action: gpio.Actions): GPIOPinsState {
  switch (action.type) {

    case gpio.ActionTypes.LOAD:
      return Object.assign({}, action.payload || initialState);

    default:
      return state;

  }
}
