import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HighlightJsModule, HighlightJsService } from 'angular2-highlight-js';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonsPageComponent } from './pages/buttons/page';
import { ButtonsPageModule } from './pages/buttons/module';
import { ChartsPageComponent } from './pages/charts/page';
import { ChartsPageModule } from './pages/charts/module';
import { CommonModule } from '@angular/common';
import { DrawersPageComponent } from './pages/drawers/page';
import { DrawersPageModule } from './pages/drawers/module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsPageComponent } from './pages/forms/page';
import { FormsPageModule } from './pages/forms/module';
import { FourOhFourPageComponent } from './lib/pages/404-page';
import { HttpModule } from '@angular/http';
import { LocalStorageModule } from 'angular-2-local-storage';
import { MarkdownPageComponent } from './pages/markdown/page';
import { MarkdownPageModule } from './pages/markdown/module';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { NoopPageComponent } from './pages/noop/page';
import { NoopPageModule } from './pages/noop/module';
import { PaginationPageComponent } from './pages/pagination/page';
import { PaginationPageModule } from './pages/pagination/module';
import { PiModule } from './lib';
import { PipesPageComponent } from './pages/pipes/page';
import { PipesPageModule } from './pages/pipes/module';
import { RootComponent } from './pages/root';
import { RouterModule } from '@angular/router';
import { RouterStoreModule } from '@ngrx/router-store';
import { SidebarComponent } from './pages/sidebar';
import { SplashPageComponent } from './pages/splash/page';
import { SplashPageModule } from './pages/splash/module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { ToolbarComponent } from './pages/toolbar';
import { UserPageComponent } from './pages/user/page';
import { UserPageModule } from './pages/user/module';
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
  PaginationPageModule,
  PipesPageModule,
  SplashPageModule,
  UserPageModule
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
  {path: 'pagination',       component: PaginationPageComponent},
  {path: 'pipes',            component: PipesPageComponent},
  {path: 'user',             component: UserPageComponent},
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
