import * as launchURL from '../lib/reducers/launch-url';
import * as navigator from '../lib/reducers/navigator';
import * as page from '../lib/reducers/page';
import * as router from '@ngrx/router-store';
import * as user from '../lib/reducers/user';
import * as window from '../lib/reducers/window';

export const reducers = {
  launchURL: launchURL.reducer,
  navigator: navigator.reducer,
  page: page.reducer,
  router: router.routerReducer,
  user: user.reducer,
  window: window.reducer
};

export class AppState {
  launchURL: launchURL.LaunchURLState;
  navigator: navigator.NavigatorState;
  page: page.PageState;
  router: router.RouterReducerState;
  user: user.UserState;
  window: window.WindowState;
}
