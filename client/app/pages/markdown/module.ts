import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
  PiModule,
  RouterModule
];

const ROUTES: Routes = [
  {path: '', component: MarkdownPageComponent}
];

@NgModule({

  declarations: [
    ...COMPONENTS
  ],

  imports: [
    ...MODULES,
    RouterModule.forChild(ROUTES)
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
