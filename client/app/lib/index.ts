import * as lib from './';

import {CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule} from '@angular/core';

import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

/**
 * pi-lib module definition
 *
 * import { PiModule } from 'pi-lib';
 *
 * @NgModule({ ... imports: [PiModule, ...] ...})
 */

 export * from './components/animated-router-outlet';
export * from './components/code-viewer';
export * from './components/drawer-container';
export * from './components/drawer-panel';
export * from './components/export-to-csv';
export * from './components/exportable-data';
export * from './components/gravatar';
export * from './components/markdown';
export * from './components/multi-selector';
export * from './components/navigator';
export * from './components/node-finder';
export * from './components/no-data-on-page';
export * from './components/pageable-data';
export * from './components/paged-datatable';
export * from './components/polymer-app';
export * from './components/polymer-form';
export * from './components/sortable-column';
export * from './components/statusbar';
export * from './directives/days-of-week';
export * from './effects/launch-url';
export * from './effects/log';
export * from './effects/navigator';
export * from './effects/page';
export * from './effects/router';
export * from './effects/user';
export * from './effects/window';
export * from './pages/404-page';
export * from './pipes/breakable';
export * from './pipes/ellipsize';
export * from './pipes/jsonify';
export * from './pipes/linkify';
export * from './pipes/markdown';
export * from './pipes/moment';
export * from './pipes/numeral';
export * from './services/configurator';
export * from './services/env';
export * from './services/paged-datasource';
export * from './utils';

const COMPONENTS = [
  lib.AnimatedRouterOutletComponent,
  lib.CodeViewerComponent,
  lib.DaysOfWeekComboDirective,
  lib.DaysOfWeekMultiDirective,
  lib.DrawerContainerComponent,
  lib.DrawerPanelComponent,
  lib.ExportToCSVComponent,
  lib.ExportableDataComponent,
  lib.FourOhFourPageComponent,
  lib.GravatarComponent,
  lib.MarkdownComponent,
  lib.MultiSelectorComponent,
  lib.MultiSelectorControlDirective,
  lib.NavigatorComponent,
  lib.NavigatorGroupComponent,
  lib.NavigatorItemComponent,
  lib.NoDataOnPageComponent,
  lib.NodeFinderComponent,
  lib.PageableDataComponent,
  lib.PagedDataTableComponent,
  lib.PolymerAppComponent,
  lib.PolymerControlDirective,
  lib.PolymerFormComponent,
  lib.SortableColumnComponent,
  lib.StatusbarComponent
];

const PIPES = [
  lib.BreakablePipe,
  lib.DateFormatPipe,
  lib.DurationPipe,
  lib.FromUnixTimePipe,
  lib.EllipsizePipe,
  lib.JSONifyPipe,
  lib.LinkifyPipe,
  lib.MarkdownPipe,
  lib.NumeralPipe,
  lib.UTCFormatPipe
];

const SERVICES = [
  lib.ConfiguratorService,
  lib.EnvService,
  lib.PagedDataSourceService
];

@NgModule({

  declarations: [
    ...COMPONENTS,
    ...PIPES
  ],

  exports: [
    ...COMPONENTS,
    ...PIPES
  ],

  imports: [
    CommonModule,
    EffectsModule.run(lib.LaunchURLEffects),
    EffectsModule.run(lib.LogEffects),
    EffectsModule.run(lib.NavigatorEffects),
    EffectsModule.run(lib.PageEffects),
    EffectsModule.run(lib.RouterEffects),
    EffectsModule.run(lib.UserEffects),
    EffectsModule.run(lib.WindowEffects),
    FlexLayoutModule,
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
