import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HighlightJsModule, HighlightJsService } from 'angular2-highlight-js';
import { RouterModule, Routes } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { FourOhFourPageComponent } from './lib/pages/404-page';
import { HttpModule } from '@angular/http';
import { LocalStorageModule } from 'angular-2-local-storage';
import { NoopPageComponent } from './pages/noop/page';
import { NoopPageModule } from './pages/noop/module';
import { PiModule } from './lib';
import { RootComponent } from './pages/root';
import { SidebarComponent } from './pages/sidebar';
import { SplashPageComponent } from './pages/splash/page';
import { SplashPageModule } from './pages/splash/module';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { ToolbarComponent } from './pages/toolbar';
import { reducers } from './reducers';

/**
 * pi-lib demo app module
 */

const COMPONENTS = [
  RootComponent,
  SidebarComponent,
  ToolbarComponent
];

const MODULES_ANGULAR = [
  BrowserAnimationsModule,
  BrowserModule,
  HttpModule
];

const MODULES_EXTERNAL = [
  HighlightJsModule,
  LocalStorageModule.withConfig({
      prefix: 'pi-lib',
      storageType: 'localStorage'
    })
];

const MODULES_INTERNAL = [
  NoopPageModule,
  PiModule,
  SplashPageModule
];

const ROUTES: Routes = [
  {path: '',                 component: SplashPageComponent},
  {path: 'buttons',          loadChildren: './pages/buttons/module#ButtonsPageModule'},
  {path: 'charts',           loadChildren: './pages/charts/module#ChartsPageModule'},
  {path: 'drawers',          loadChildren: './pages/drawers/module#DrawersPageModule'},
  {path: 'forms',            loadChildren: './pages/forms/module#FormsPageModule'},
  {path: 'home',             component: SplashPageComponent},
  {path: 'maps',             loadChildren: './pages/maps/module#MapsPageModule'},
  {path: 'markdown/:doc',    loadChildren: './pages/markdown/module#MarkdownPageModule'},
  {path: 'noop',             component: NoopPageComponent},
  {path: 'pagination',       loadChildren: './pages/pagination/module#PaginationPageModule'},
  {path: 'pipes',            loadChildren: './pages/pipes/module#PipesPageModule'},
  {path: 'user',             loadChildren: './pages/user/module#UserPageModule'},
  {path: '**',               component: FourOhFourPageComponent}
];

const SERVICES = [
  HighlightJsService
];

@NgModule({

  bootstrap: [RootComponent],

  declarations: [
    ...COMPONENTS
  ],

  imports: [
    ...MODULES_ANGULAR,
    ...MODULES_EXTERNAL,
    ...MODULES_INTERNAL,
    EffectsModule.forRoot([]),
    RouterModule.forRoot(ROUTES, { useHash: true }),
    StoreRouterConnectingModule,
    StoreModule.forRoot(reducers)
  ],

  providers: [
    ...SERVICES
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})

export class RootModule { }
