import * as gpio from './gpio-pins';
import * as router from '@ngrx/router-store';
import * as sidebar from '../lib/reducers/sidebar';

export const reducers = {
  gpio: gpio.reducer,
  router: router.routerReducer,
  sidebar: sidebar.reducer
};

export interface AppState {
  gpio: gpio.GPIOPinsState;
  router: router.RouterState;
  sidebar: sidebar.SidebarState;
}
