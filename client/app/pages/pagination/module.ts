import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PaginationPageComponent } from './page';
import { PiModule } from '../../lib';
import { TestCtrlComponent } from './ctrl';
import { TestDataSourceService } from './datasource';
import { TestFilterComponent } from './filter';
import { TestSaverComponent } from './saver';
import { TestSelectorComponent } from './selector';
import { TestTableComponent } from './table';

/**
 * Pagination page module
 */

const COMPONENTS = [
  PaginationPageComponent,
  TestCtrlComponent,
  TestFilterComponent,
  TestSaverComponent,
  TestSelectorComponent,
  TestTableComponent
];

const MODULES = [
  CommonModule,
  FlexLayoutModule,
  PiModule
];

const SERVICES = [
  TestDataSourceService
];

@NgModule({

  declarations: [
    ...COMPONENTS
  ],

  imports: [
    ...MODULES
  ],

  providers: [
    ...SERVICES
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})

export class PaginationPageModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PaginationPageModule,
      providers: [ ]
    };
  }
}
