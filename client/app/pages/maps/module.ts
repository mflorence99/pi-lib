import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MapsPageComponent } from './page';
import { PiModule } from '../../lib';

/**
 * Maps page module
 */

const COMPONENTS = [
  MapsPageComponent
];

const MODULES = [
  PiModule
];

const ROUTES: Routes = [
  {path: '', component: MapsPageComponent}
];

@NgModule({

  declarations: [
    ...COMPONENTS
  ],

  imports: [
    ...MODULES,
    RouterModule.forChild(ROUTES)
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})

export class MapsPageModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MapsPageModule,
      providers: [ ]
    };
  }
}
