import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule } from '@angular/core';

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

export class MapsPageModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MapsPageModule,
      providers: [ ]
    };
  }
}
