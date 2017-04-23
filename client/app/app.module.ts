import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppComponent } from './containers/app';
import { AppRoutes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FourOhFourComponent } from './lib/containers/404';
import { HttpModule } from '@angular/http';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { NoopComponent } from './containers/noop';
import { PiModule } from './lib';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';

const DECLARATIONS = [
  AppComponent,
  FourOhFourComponent,
  NoopComponent
];

@NgModule({

  bootstrap: [AppComponent],

  declarations: [
    ...DECLARATIONS
  ],

  imports: [
    AppRoutes,
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    FlexLayoutModule,
    HttpModule,
    Ng2GoogleChartsModule,
    PiModule,
    RouterStoreModule.connectRouter(),
    StoreModule.provideStore(reducers)
  ],

  exports: [
    ...DECLARATIONS,
    Ng2GoogleChartsModule,
    FlexLayoutModule,
    PiModule,
    StoreModule
  ],

  providers: [
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})

export class AppModule { }
