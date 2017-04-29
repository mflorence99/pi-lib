import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { NoopPageComponent } from './page';
import { PiModule } from '../../lib';

/**
 * Noop page module
 */

const DECLARATIONS = [
  NoopPageComponent
];

@NgModule({

  declarations: [
    ...DECLARATIONS
  ],

  exports: [
    ...DECLARATIONS
  ],

  imports: [
    CommonModule,
    PiModule
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})

export class NoopPageModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NoopPageModule,
      providers: [ ]
    };
  }
}
