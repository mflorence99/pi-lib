import { FourOhFourComponent } from './lib/containers/404';
import { NoopComponent } from './containers/noop';
import { RouterModule } from '@angular/router';

export const AppRoutes = RouterModule.forRoot([
  {path: '',                 component: NoopComponent},
  {path: '**',               component: FourOhFourComponent}
], { useHash: true });
