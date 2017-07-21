import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsPageComponent } from './page';
import { PiModule } from '../../lib';
import { PolymerModule } from '@codebakery/origami';
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
  PiModule,
  PolymerModule,
  RouterModule
];

const ROUTES: Routes = [
  {path: '', component: FormsPageComponent}
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

export class FormsPageModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FormsPageModule,
      providers: [ ]
    };
  }
}
