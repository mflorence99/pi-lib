import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppComponent } from './containers/app';
import { AppRoutes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FourOhFourPageComponent } from './lib/containers/404-page';
import { GPIOPageComponent } from './containers/gpio-page';
import { GPIOPinsComponent } from './components/gpio-pins';
import { GPIOPinsEffects } from './effects/gpio-pins';
import { GPIOPinsService } from './services/gpio-pins';
import { HttpModule } from '@angular/http';
import { LocalStorageModule } from 'angular-2-local-storage';
import { NoopPageComponent } from './containers/noop-page';
import { PiModule } from './lib';
import { RouterModule } from '@angular/router';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';

const DECLARATIONS = [
  AppComponent,
  FourOhFourPageComponent,
  GPIOPageComponent,
  GPIOPinsComponent,
  NoopPageComponent
];

@NgModule({

  bootstrap: [AppComponent],

  declarations: [
    ...DECLARATIONS
  ],

  exports: [
    ...DECLARATIONS
  ],

  imports: [
    AppRoutes,
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    EffectsModule.run(GPIOPinsEffects),
    FlexLayoutModule,
    HttpModule,
    LocalStorageModule.withConfig({
      prefix: 'pi-lib',
      storageType: 'localStorage'
    }),
    PiModule,
    RouterModule,
    RouterStoreModule.connectRouter(),
    StoreModule.provideStore(reducers)
  ],

  providers: [
    GPIOPinsService
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})

export class AppModule { }
