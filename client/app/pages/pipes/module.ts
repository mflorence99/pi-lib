import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PiModule } from '../../lib';
import { PipesPageComponent } from './page';
import { TestFilterComponent } from './filter';
import { TestPipesComponent } from './pipes';

/**
 * Pipes page module
 */

const COMPONENTS = [
  PipesPageComponent,
  TestFilterComponent,
  TestPipesComponent
];

const MODULES = [
  CommonModule,
  FlexLayoutModule,
  PiModule,
  RouterModule
];

const ROUTES: Routes = [
  {path: '', component: PipesPageComponent}
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

export class PipesPageModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PipesPageModule,
      providers: [ ]
    };
  }
}
