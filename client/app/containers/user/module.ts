import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PiModule } from '../../lib';
import { UserCtrlComponent } from './ctrl';
import { UserFormComponent } from './form';
import { UserPageComponent } from './page';

/**
 * User page module
 */

const COMPONENTS = [
  UserCtrlComponent,
  UserFormComponent,
  UserPageComponent
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

export class UserPageModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UserPageModule,
      providers: [ ]
    };
  }
}
