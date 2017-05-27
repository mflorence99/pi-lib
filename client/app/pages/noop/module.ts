import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NoopPageComponent } from './page';
import { PiModule } from '../../lib';

/**
 * Noop page module
 */

const COMPONENTS = [
  NoopPageComponent
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

export class NoopPageModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NoopPageModule,
      providers: [ ]
    };
  }
}
