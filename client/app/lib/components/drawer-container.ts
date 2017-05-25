import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { DrawerPanelComponent } from './drawer-panel';

/**
 * lib-drawer-container
 *
 * Used to hold lib-drawer-panels
 */

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'lib-drawer-container',
  styleUrls: ['drawer-container.less'],
  templateUrl: 'drawer-container.html'
})

export class DrawerContainerComponent {

  drawers = {
    bottom: null as DrawerPanelComponent,
    left: null as DrawerPanelComponent,
    right: null as DrawerPanelComponent,
    top: null as DrawerPanelComponent
  };

  masked: boolean;

  /** Close all the drawers */
  closeAll() {
    Object.keys(this.drawers).forEach(position => {
      const drawer = this.drawers[position];
      if (drawer)
        drawer.close();
    });
  }

  /** A drawer has been closed */
  closed(drawer: DrawerPanelComponent) {
    this.masked = false;
  }

  /** A drawer has been opened */
  opened(drawer: DrawerPanelComponent) {
    this.masked = true;
  }

}
