import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule } from '@angular/core';

import { ButtonsPageComponent } from './page';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PiModule } from '../../lib';

/**
 * Buttons & dialogs test page module
 */

const COMPONENTS = [
  ButtonsPageComponent
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

export class ButtonsPageModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ButtonsPageModule,
      providers: [ ]
    };
  }
}
