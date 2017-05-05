import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule } from '@angular/core';

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
  PiModule
];

@NgModule({

  declarations: [
    ...COMPONENTS
  ],

  imports: [
    ...MODULES
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
