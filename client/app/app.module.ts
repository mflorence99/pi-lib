import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppComponent } from './containers/app';
import { AppRoutes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { Cloudinary } from 'cloudinary-core';
import { CloudinaryModule } from '@cloudinary/angular';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FourOhFourComponent } from './lib/containers/404';
import { HttpModule } from '@angular/http';
import { LocalStorageModule } from 'angular-2-local-storage';
import { NoopComponent } from './containers/noop';
import { PiModule } from './lib';
import { RouterModule } from '@angular/router';
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

  exports: [
    ...DECLARATIONS
  ],

  imports: [
    AppRoutes,
    BrowserAnimationsModule,
    BrowserModule,
    CloudinaryModule.forRoot({Cloudinary: Cloudinary}, {
      cloud_name: 'mflo999'
    }),
    CommonModule,
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
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})

export class AppModule { }
