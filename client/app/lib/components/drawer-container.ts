import 'rxjs/add/observable/merge';

import { AfterContentInit } from '@angular/core';
import { AutoUnsubscribe } from '../decorators/auto-unsubscribe';
import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { ContentChildren } from '@angular/core';
import { DrawerPanelComponent } from './drawer-panel';
import { Observable } from 'rxjs/Observable';
import { QueryList } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

/**
 * pi-drawer-container
 *
 * Used to hold pi-drawer-panels
 */

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'pi-drawer-container',
  styleUrls: ['drawer-container.less'],
  templateUrl: 'drawer-container.html'
})

@AutoUnsubscribe()
export class DrawerContainerComponent implements AfterContentInit  {
  @ContentChildren(DrawerPanelComponent) drawers: QueryList<DrawerPanelComponent>;

  masked: boolean;

  private changes: Subscription;
  private listeners: Subscription;

  /** Close all the drawers */
  closeAll() {
    this.drawers.forEach(drawer => drawer.close());
  }

  // lifecycle methods

  ngAfterContentInit() {
    this.listen();
    // re-listen whenever the drawers change
    this.changes = this.drawers.changes.subscribe(() => {
      this.listeners.unsubscribe();
      this.listen();
    });
  }

  // private methods

  private listen() {
    const emitters = this.drawers.reduce((acc, drawer) => {
      acc.push(drawer.opened);
      return acc;
    }, []);
    // un/mask the container when and drawer closes/opens
    this.listeners = Observable.merge(...emitters)
      .do((open: boolean) => this.masked = open)
      .subscribe();
  }

}
