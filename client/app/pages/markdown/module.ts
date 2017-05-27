import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MarkdownPageComponent } from './page';
import { PiModule } from '../../lib';

/**
 * Markdown page module
 */

const COMPONENTS = [
  MarkdownPageComponent
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

export class MarkdownPageModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MarkdownPageModule,
      providers: [ ]
    };
  }
}
