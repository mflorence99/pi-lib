import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { GPIOPageComponent } from './page';
import { GPIOPinsComponent } from './pins';
import { PiModule } from '../../lib';

/**
 * Noop page module
 */

const COMPONENTS = [
  GPIOPageComponent,
  GPIOPinsComponent
];

const MODULES = [
  CommonModule,
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

export class GPIOPageModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: GPIOPageModule,
      providers: [ ]
    };
  }
}
