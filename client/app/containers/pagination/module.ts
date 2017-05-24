import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PaginationPageComponent } from './page';
import { PiModule } from '../../lib';
import { TestCtrlComponent } from './test-ctrl';
import { TestDataSourceService } from './test-datasource';
import { TestFilterComponent } from './test-filter';
import { TestTableComponent } from './test-table';

/**
 * Pagination page module
 */

const COMPONENTS = [
  PaginationPageComponent,
  TestCtrlComponent,
  TestFilterComponent,
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
