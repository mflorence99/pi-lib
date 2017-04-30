import * as lib from './';

import {CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule} from '@angular/core';

import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterEffects } from './effects/router';
import { RouterModule } from '@angular/router';
import { SidebarEffects } from './effects/sidebar';

/**
 * pi-lib module definition
 *
 * import { PiModule } from 'pi-lib';
 *
 * @NgModule({ ... imports: [PiModule, ...] ...})
 */

export * from './components/multi-selector';
export * from './components/no-data-on-page';
export * from './components/polymer-app';
export * from './components/polymer-form';
export * from './components/sidebar';
export * from './containers/404-page';
export * from './pipes/breakable';
export * from './pipes/ellipsize';
export * from './pipes/jsonify';
export * from './services/env';
export * from './utils';

const DECLARATIONS = [
  lib.BreakablePipe,
  lib.EllipsizePipe,
  lib.FourOhFourPageComponent,
  lib.JSONifyPipe,
  lib.MultiSelectorComponent,
  lib.MultiSelectorControlDirective,
  lib.NoDataOnPageComponent,
  lib.PolymerAppComponent,
  lib.PolymerControlDirective,
  lib.PolymerFormComponent,
  lib.SidebarComponent,
  lib.SidebarGroupComponent
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
    CommonModule,
    EffectsModule.run(RouterEffects),
    EffectsModule.run(SidebarEffects),
    FlexLayoutModule,
    RouterModule
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
