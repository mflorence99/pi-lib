import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HighlightJsModule, HighlightJsService } from 'angular2-highlight-js';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsPageComponent } from './containers/forms/page';
import { FormsPageModule } from './containers/forms/module';
import { FourOhFourPageComponent } from './lib/containers/404-page';
import { GPIOPageComponent } from './containers/gpio/page';
import { GPIOPageModule } from './containers/gpio/module';
import { GPIOPinsEffects } from './effects/gpio-pins';
import { GPIOPinsService } from './services/gpio-pins';
import { HttpModule } from '@angular/http';
import { LocalStorageModule } from 'angular-2-local-storage';
import { MarkdownPageComponent } from './containers/markdown/page';
import { MarkdownPageModule } from './containers/markdown/module';
import { NoopPageComponent } from './containers/noop/page';
import { NoopPageModule } from './containers/noop/module';
import { PiModule } from './lib';
import { PipesPageComponent } from './containers/pipes/page';
import { PipesPageModule } from './containers/pipes/module';
import { RootComponent } from './containers/root';
import { RouterModule } from '@angular/router';
import { RouterStoreModule } from '@ngrx/router-store';
import { SidebarComponent } from './containers/sidebar';
import { SplashPageComponent } from './containers/splash/page';
import { SplashPageModule } from './containers/splash/module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';

/**
 * pi-lib demo app module
 */

const COMPONENTS = [
  RootComponent,
  SidebarComponent
];

const MODULES_ANGULAR = [
  BrowserAnimationsModule,
  BrowserModule,
  CommonModule,
  FlexLayoutModule,
  HttpModule,
  RouterModule
];

const MODULES_EXTERNAL = [
  HighlightJsModule,
  LocalStorageModule.withConfig({
      prefix: 'pi-lib',
      storageType: 'localStorage'
    })
];

const MODULES_INTERNAL = [
  FormsPageModule,
  GPIOPageModule,
  MarkdownPageModule,
  NoopPageModule,
  PiModule,
  PipesPageModule,
  SplashPageModule
];

const ROUTES = [
  {path: '',                 component: SplashPageComponent},
  {path: 'forms',            component: FormsPageComponent},
  {path: 'gpio',             component: GPIOPageComponent},
  {path: 'home',             component: SplashPageComponent},
  {path: 'markdown',         component: MarkdownPageComponent},
  {path: 'noop',             component: NoopPageComponent},
  {path: 'pipes',            component: PipesPageComponent},
  {path: '**',               component: FourOhFourPageComponent}
];

const SERVICES = [
  GPIOPinsService,
  HighlightJsService
];

// see: https://www.npmjs.com/package/ngrx-store-freeze
// NOTE: this is recommended, but seems to seriously confuse Webpack and create build errors

// const metaReducers = environment.production?
//   [storeFreeze, combineReducers] : [combineReducers];
// const appStore = compose(...metaReducers)(reducers);

@NgModule({

  bootstrap: [RootComponent],

  declarations: [
    ...COMPONENTS
  ],

  imports: [
    ...MODULES_ANGULAR,
    ...MODULES_EXTERNAL,
    ...MODULES_INTERNAL,
    EffectsModule.run(GPIOPinsEffects),
    RouterModule.forRoot(ROUTES, { useHash: true }),
    RouterStoreModule.connectRouter(),
    StoreModule.provideStore(reducers),
    StoreDevtoolsModule.instrumentOnlyWithExtension({
        maxAge: 5
      })
  ],

  providers: [
    ...SERVICES
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})

export class RootModule { }
