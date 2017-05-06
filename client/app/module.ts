import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HighlightJsModule, HighlightJsService } from 'angular2-highlight-js';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonsPageComponent } from './containers/buttons/page';
import { ButtonsPageModule } from './containers/buttons/module';
import { ChartsPageComponent } from './containers/charts/page';
import { ChartsPageModule } from './containers/charts/module';
import { CommonModule } from '@angular/common';
import { DrawersPageComponent } from './containers/drawers/page';
import { DrawersPageModule } from './containers/drawers/module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsPageComponent } from './containers/forms/page';
import { FormsPageModule } from './containers/forms/module';
import { FourOhFourPageComponent } from './lib/containers/404-page';
import { HttpModule } from '@angular/http';
import { LocalStorageModule } from 'angular-2-local-storage';
import { MarkdownPageComponent } from './containers/markdown/page';
import { MarkdownPageModule } from './containers/markdown/module';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
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
    }),
  Ng2GoogleChartsModule
];

const MODULES_INTERNAL = [
  ButtonsPageModule,
  ChartsPageModule,
  DrawersPageModule,
  FormsPageModule,
  MarkdownPageModule,
  NoopPageModule,
  PiModule,
  PipesPageModule,
  SplashPageModule
];

const ROUTES = [
  {path: '',                 component: SplashPageComponent},
  {path: 'buttons',          component: ButtonsPageComponent},
  {path: 'charts',           component: ChartsPageComponent},
  {path: 'drawers',          component: DrawersPageComponent},
  {path: 'forms',            component: FormsPageComponent},
  {path: 'home',             component: SplashPageComponent},
  {path: 'markdown',         component: MarkdownPageComponent},
  {path: 'noop',             component: NoopPageComponent},
  {path: 'pipes',            component: PipesPageComponent},
  {path: '**',               component: FourOhFourPageComponent}
];

const SERVICES = [
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
