import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { PiModule } from '../../lib';
import { SplashPageComponent } from './page';

/**
 * Splash page module
 */

const DECLARATIONS = [
  SplashPageComponent
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

export class SplashPageModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SplashPageModule,
      providers: [ ]
    };
  }
}
