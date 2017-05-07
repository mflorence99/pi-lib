import * as navigator from '../lib/reducers/navigator';
import * as router from '@ngrx/router-store';
import * as user from '../lib/reducers/user';
import * as window from '../lib/reducers/window';

export const reducers = {
  router: router.routerReducer,
  navigator: navigator.reducer,
  user: user.reducer,
  window: window.reducer
};

export class AppState {
  navigator: navigator.NavigatorState;
  router: router.RouterState;
  user: user.UserState;
  window: window.WindowState;
}
