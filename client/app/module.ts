import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FourOhFourPageComponent } from './lib/containers/404-page';
import { GPIOPageComponent } from './containers/gpio/page';
import { GPIOPageModule } from './containers/gpio/module';
import { GPIOPinsEffects } from './effects/gpio-pins';
import { GPIOPinsService } from './services/gpio-pins';
import { HttpModule } from '@angular/http';
import { LocalStorageModule } from 'angular-2-local-storage';
import { NoopPageComponent } from './containers/noop/page';
import { NoopPageModule } from './containers/noop/module';
import { PiModule } from './lib';
import { RootComponent } from './containers/root';
import { RouterModule } from '@angular/router';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import { environment } from '../environments/environment';
import { reducers } from './reducers';
import { storeFreeze } from 'ngrx-store-freeze';

/**
 * pi-lib demo app module
 */

const DECLARATIONS = [
  FourOhFourPageComponent,
  RootComponent
];

const ROUTES = [
  {path: '',                 component: FourOhFourPageComponent},
  {path: 'gpio',             component: GPIOPageComponent},
  {path: 'x',                component: NoopPageComponent},
  {path: 'y',                component: FourOhFourPageComponent},
  {path: '**',               component: FourOhFourPageComponent}
];

// see: https://www.npmjs.com/package/ngrx-store-freeze
const metaReducers = environment.production?
  [storeFreeze, combineReducers] : [combineReducers];
const appStore = compose(...metaReducers)(reducers);

@NgModule({

  bootstrap: [RootComponent],

  declarations: [
    ...DECLARATIONS
  ],

  exports: [
    ...DECLARATIONS
  ],

  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    EffectsModule.run(GPIOPinsEffects),
    FlexLayoutModule,
    GPIOPageModule,
    HttpModule,
    LocalStorageModule.withConfig({
        prefix: 'pi-lib',
        storageType: 'localStorage'
      }),
    NoopPageModule,
    PiModule,
    RouterModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    RouterStoreModule.connectRouter(),
    StoreModule.provideStore(appStore),
    StoreDevtoolsModule.instrumentOnlyWithExtension({
        maxAge: 5
      })
  ],

  providers: [
    GPIOPinsService
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})

export class RootModule { }
