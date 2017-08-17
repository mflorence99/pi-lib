import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule } from '@angular/core';
import { DateFormatPipe, DurationPipe, FromUnixTimePipe, TimeAgoPipe, UTCFormatPipe } from './pipes/moment';
import { DaysOfWeekComboDirective, DaysOfWeekMultiDirective } from './directives/days-of-week';
import { MultiSelectorComponent, MultiSelectorControlDirective } from './components/multi-selector';
import { NavigatorComponent, NavigatorGroupComponent, NavigatorItemComponent } from './components/navigator';
import { PeriodDirective, PeriodsComboDirective, PeriodsMultiDirective } from './directives/periods';
import { PolymerControlDirective, PolymerFormComponent } from './components/polymer-form';

import { AnimatedRouterOutletComponent } from './components/animated-router-outlet';
import { BreakablePipe } from './pipes/breakable';
import { CircledNumberComponent } from './components/circled-number';
import { CodeViewerComponent } from './components/code-viewer';
import { CommonModule } from '@angular/common';
import { ConfiguratorService } from './services/configurator';
import { DrawerContainerComponent } from './components/drawer-container';
import { DrawerPanelComponent } from './components/drawer-panel';
import { EffectsModule } from '@ngrx/effects';
import { EllipsizePipe } from './pipes/ellipsize';
import { EnvService } from './services/env';
import { ExportToCSVComponent } from './components/export-to-csv';
import { ExportableDataComponent } from './components/exportable-data';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FourOhFourPageComponent } from './pages/404-page';
import { GoogleMapComponent } from './components/google-map';
import { GoogleMapInfoWindowComponent } from './components/google-map-infowindow';
import { GravatarComponent } from './components/gravatar';
import { HTMLifyPipe } from './pipes/htmlify';
import { JSONifyPipe } from './pipes/jsonify';
import { LaunchURLEffects } from './effects/launch-url';
import { LinkifyPipe } from './pipes/linkify';
import { LogEffects } from './effects/log';
import { MarkdownComponent } from './components/markdown';
import { MarkdownPipe } from './pipes/markdown';
import { NavigatorEffects } from './effects/navigator';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { NoDataOnPageComponent } from './components/no-data-on-page';
import { NodeFinderComponent } from './components/node-finder';
import { NumeralPipe } from './pipes/numeral';
import { PageEffects } from './effects/page';
import { PageableDataComponent } from './components/pageable-data';
import { PagedDataSourceService } from './services/paged-datasource';
import { PagedDataTableComponent } from './components/paged-datatable';
import { PolymerAppComponent } from './components/polymer-app';
import { RouterEffects } from './effects/router';
import { RouterModule } from '@angular/router';
import { SortableColumnComponent } from './components/sortable-column';
import { StatusbarComponent } from './components/statusbar';
import { TinyButtonComponent } from './components/tiny-button';
import { ToolbarControlsComponent } from './components/toolbar-controls';
import { UserEffects } from './effects/user';
import { WindowEffects } from './effects/window';
import { WorkingButtonComponent } from './components/working-button';

/**
 * angular-lib module definition
 */


const COMPONENTS = [
  AnimatedRouterOutletComponent,
  CircledNumberComponent,
  CodeViewerComponent,
  DaysOfWeekComboDirective,
  DaysOfWeekMultiDirective,
  DrawerContainerComponent,
  DrawerPanelComponent,
  ExportToCSVComponent,
  ExportableDataComponent,
  FourOhFourPageComponent,
  GoogleMapComponent,
  GoogleMapInfoWindowComponent,
  GravatarComponent,
  MarkdownComponent,
  MultiSelectorComponent,
  MultiSelectorControlDirective,
  NavigatorComponent,
  NavigatorGroupComponent,
  NavigatorItemComponent,
  NoDataOnPageComponent,
  NodeFinderComponent,
  PageableDataComponent,
  PagedDataTableComponent,
  PeriodDirective,
  PeriodsComboDirective,
  PeriodsMultiDirective,
  PolymerAppComponent,
  PolymerControlDirective,
  PolymerFormComponent,
  SortableColumnComponent,
  StatusbarComponent,
  TinyButtonComponent,
  ToolbarControlsComponent,
  WorkingButtonComponent
];

const PIPES = [
  BreakablePipe,
  DateFormatPipe,
  DurationPipe,
  FromUnixTimePipe,
  EllipsizePipe,
  HTMLifyPipe,
  JSONifyPipe,
  LinkifyPipe,
  MarkdownPipe,
  NumeralPipe,
  TimeAgoPipe,
  UTCFormatPipe
];

const SERVICES = [
  ConfiguratorService,
  EnvService,
  PagedDataSourceService
];

@NgModule({

  declarations: [
    ...COMPONENTS,
    ...PIPES
  ],

  exports: [
    ...COMPONENTS,
    ...PIPES,
    CommonModule,
    FlexLayoutModule,
    Ng2GoogleChartsModule,
    RouterModule
  ],

  imports: [
    CommonModule,
    EffectsModule.forFeature([
      LaunchURLEffects,
      LogEffects,
      NavigatorEffects,
      PageEffects,
      RouterEffects,
      UserEffects,
      WindowEffects
    ]),
    FlexLayoutModule,
    Ng2GoogleChartsModule,
    RouterModule
  ],

  providers: [
    ...SERVICES
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})

export class PiModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PiModule,
      providers: [
        ...SERVICES
      ]
    };
  }
}
