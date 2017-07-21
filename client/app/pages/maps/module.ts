import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MapsPageComponent } from './page';
import { PiModule } from '../../lib';

/**
 * Maps page module
 */

const COMPONENTS = [
  MapsPageComponent
];

const MODULES = [
  CommonModule,
  FlexLayoutModule,
  PiModule,
  RouterModule
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
