import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsPageComponent } from './page';
import { PiModule } from '../../lib';
import { TestCtrlComponent } from './test-ctrl';
import { TestFormComponent } from './test-form';

/**
 * Forms page module
 */

const DECLARATIONS = [
  FormsPageComponent,
  TestCtrlComponent,
  TestFormComponent
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
    FlexLayoutModule,
    PiModule
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
