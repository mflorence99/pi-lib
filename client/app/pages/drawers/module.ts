import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { DrawersPageComponent } from './page';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PiModule } from '../../lib';

/**
 * Noop page module
 */

const COMPONENTS = [
  DrawersPageComponent
];

const MODULES = [
  CommonModule,
  FlexLayoutModule,
  PiModule,
  RouterModule
];

const ROUTES: Routes = [
  {path: '', component: DrawersPageComponent}
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

export class DrawersPageModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DrawersPageModule,
      providers: [ ]
    };
  }
}
