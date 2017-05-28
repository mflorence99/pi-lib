import * as lib from './';

import {CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule} from '@angular/core';

import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LaunchURLEffects } from './effects/launch-url';
import { LogEffects } from './effects/log';
import { NavigatorEffects } from './effects/navigator';
import { PageEffects } from './effects/page';
import { RouterEffects } from './effects/router';
import { RouterModule } from '@angular/router';
import { UserEffects } from './effects/user';
import { WindowEffects } from './effects/window';

/**
 * pi-lib module definition
 *
 * import { PiModule } from 'pi-lib';
 *
 * @NgModule({ ... imports: [PiModule, ...] ...})
 */

export * from './components/code-viewer';
export * from './components/drawer-container';
export * from './components/drawer-panel';
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
export * from './components/route-animation';
export * from './components/sortable-column';
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
  lib.CodeViewerComponent,
  lib.DrawerContainerComponent,
  lib.DrawerPanelComponent,
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
  lib.RouteAnimationComponent,
  lib.SortableColumnComponent
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
    EffectsModule.run(LaunchURLEffects),
    EffectsModule.run(LogEffects),
    EffectsModule.run(NavigatorEffects),
    EffectsModule.run(PageEffects),
    EffectsModule.run(RouterEffects),
    EffectsModule.run(UserEffects),
    EffectsModule.run(WindowEffects),
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
