import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MarkdownPageComponent } from './page';
import { PiModule } from '../../lib';

/**
 * Markdown page module
 */

const COMPONENTS = [
  MarkdownPageComponent
];

const MODULES = [
  PiModule
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
