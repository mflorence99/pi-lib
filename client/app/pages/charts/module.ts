import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChartsPageComponent } from './page';
import { PiModule } from '../../lib';

/**
 * Charts page module
 */

const COMPONENTS = [
  ChartsPageComponent
];

const MODULES = [
  PiModule
];

const ROUTES: Routes = [
  {path: '', component: ChartsPageComponent}
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

export class ChartsPageModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ChartsPageModule,
      providers: [ ]
    };
  }
}
