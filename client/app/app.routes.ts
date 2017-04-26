import { FourOhFourPageComponent } from './lib/containers/404-page';
import { GPIOPageComponent } from './containers/gpio-page';
import { NoopPageComponent } from './containers/noop-page';
import { RouterModule } from '@angular/router';

export const AppRoutes = RouterModule.forRoot([
  {path: '',                 component: FourOhFourPageComponent},
  {path: 'gpio',             component: GPIOPageComponent},
  {path: 'x',                component: NoopPageComponent},
  {path: 'y',                component: FourOhFourPageComponent},
  {path: '**',               component: FourOhFourPageComponent}
], { useHash: true });
