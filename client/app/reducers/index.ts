import * as router from '@ngrx/router-store';
import * as sidebar from '../lib/reducers/sidebar';

export const reducers = {
  router: router.routerReducer,
  sidebar: sidebar.reducer
};

export interface AppState {
  router: router.RouterState;
  sidebar: sidebar.SidebarState;
}
