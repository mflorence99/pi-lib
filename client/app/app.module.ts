import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppComponent } from './containers/app';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpModule } from '@angular/http';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { PiModule } from './lib';
import { StoreModule } from '@ngrx/store';

const DECLARATIONS = [
  AppComponent
];

@NgModule({

  bootstrap: [AppComponent],

  declarations: [
    ...DECLARATIONS
  ],

  imports: [
    BrowserModule,
    CommonModule,
    FlexLayoutModule,
    HttpModule,
    Ng2GoogleChartsModule,
    PiModule
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
