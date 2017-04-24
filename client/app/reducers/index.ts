import * as router from '@ngrx/router-store';

export const reducers = {
  router: router.routerReducer,
};

export interface AppState {
  router: router.RouterState;
}
