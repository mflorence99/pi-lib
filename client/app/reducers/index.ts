import * as navigator from '../lib/reducers/navigator';
import * as router from '@ngrx/router-store';
import * as window from '../lib/reducers/window';

export const reducers = {
  router: router.routerReducer,
  navigator: navigator.reducer,
  window: window.reducer
};

export interface AppState {
  navigator: navigator.NavigatorState;
  router: router.RouterState;
  window: window.WindowState;
}
