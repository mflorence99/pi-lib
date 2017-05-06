import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule } from '@angular/core';

import { ChartsPageComponent } from './page';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { PiModule } from '../../lib';

/**
 * Charts page module
 */

const COMPONENTS = [
  ChartsPageComponent
];

const MODULES = [
  CommonModule,
  FlexLayoutModule,
  Ng2GoogleChartsModule,
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

export class ChartsPageModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ChartsPageModule,
      providers: [ ]
    };
  }
}
