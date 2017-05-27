import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsPageComponent } from './page';
import { PiModule } from '../../lib';
import { TestCtrlComponent } from './ctrl';
import { TestFormComponent } from './form';

/**
 * Forms page module
 */

const COMPONENTS = [
  FormsPageComponent,
  TestCtrlComponent,
  TestFormComponent
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

export class FormsPageModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FormsPageModule,
      providers: [ ]
    };
  }
}
