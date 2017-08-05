import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ButtonsPageComponent } from './page';
import { PiModule } from '../../lib';

/**
 * Buttons & dialogs test page module
 */

const COMPONENTS = [
  ButtonsPageComponent
];

const MODULES = [
  PiModule
];

const ROUTES: Routes = [
  {path: '', component: ButtonsPageComponent}
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

export class ButtonsPageModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ButtonsPageModule,
      providers: [ ]
    };
  }
}
