import { ModuleWithProviders, NgModule } from '@angular/core';

import { GPIOPageComponent } from './page';
import { GPIOPinsComponent } from './pins';
import { PiModule } from '../../lib';

/**
 * Noop page module
 */

const DECLARATIONS = [
  GPIOPageComponent,
  GPIOPinsComponent
];

@NgModule({

  declarations: [
    ...DECLARATIONS
  ],

  exports: [
    ...DECLARATIONS
  ],

  imports: [
    PiModule
  ]

})

export class GPIOPageModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: GPIOPageModule,
      providers: [ ]
    };
  }
}
