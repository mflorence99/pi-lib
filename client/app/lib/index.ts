import * as lib from './';

import {CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule} from '@angular/core';

import { CommonModule } from '@angular/common';

/**
 * pi-lib module definition
 *
 * import { PiModule } from 'pi-lib';
 *
 * @NgModule({ ... imports: [PiModule, ...] ...})
 */

export * from './components/no-data-on-page';
export * from './components/polymer-app';
export * from './pipes/breakable';
export * from './pipes/ellipsize';
export * from './pipes/jsonify';
export * from './services/env';
export * from './utils';

const DECLARATIONS = [
  lib.BreakablePipe,
  lib.EllipsizePipe,
  lib.JSONifyPipe,
  lib.NoDataOnPageComponent,
  lib.PolymerAppComponent
];

const PROVIDERS = [
  lib.EnvService
];

@NgModule({

  declarations: [
    ...DECLARATIONS
  ],

  exports: [
    ...DECLARATIONS
  ],

  imports: [
    CommonModule
  ],

  providers: [
    ...PROVIDERS
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})

export class PiModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PiModule,
      providers: [
        ...PROVIDERS
      ]
    };
  }
}
