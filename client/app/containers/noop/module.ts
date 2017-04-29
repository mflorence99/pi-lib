import { ModuleWithProviders, NgModule } from '@angular/core';

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
    PiModule
  ]

})

export class NoopPageModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NoopPageModule,
      providers: [ ]
    };
  }
}
