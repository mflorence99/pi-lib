import {ChangeDetectionStrategy, Component, HostListener} from '@angular/core';

/**
 * Prepares app to use Polymer.
 *
 * Place somewhere at root level on the main page.
 *
 * <pi-polymer-app>
 * </pi-no-data-on-page>
 *
 * <main>
 *   ...
 * </main>
 *
 */

declare var Polymer: any;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pi-polymer-app',
  templateUrl: 'polymer-app.html',
  styleUrls: ['polymer-app.less']
})

export class PolymerAppComponent {
  loaded = false;
  loading = true;

  // https://github.com/webcomponents/webcomponentsjs#webcomponentsloaded
  @HostListener('window:WebComponentsReady') onWebComponentsReady() {
    Polymer.updateStyles();
    this.loaded = true;
    this.loading = false;
  }

}
