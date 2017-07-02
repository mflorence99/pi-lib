import { AfterViewInit } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { DrawerContainerComponent } from './drawer-container';
import { ElementRef } from '@angular/core';
import { HostListener } from '@angular/core';
import { Injector } from '@angular/core';
import { Input } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';

/**
 * lib-drawer-panel component
 *
 * Slidable drawer panel, top, right, bottom, left.
 */

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'lib-drawer-panel',
  styleUrls: ['drawer-panel.less'],
  templateUrl: 'drawer-panel.html'
})

export class DrawerPanelComponent implements AfterViewInit, OnDestroy, OnInit {
  @Input() position: 'top' | 'right' | 'bottom' | 'left' = 'left';

  private container: DrawerContainerComponent;
  private el: HTMLElement;

  /** ctor */
  constructor(private element: ElementRef,
              private injector: Injector) { }

  /** Close drawer */
  close() {
    if (this.el) {
      switch (this.position) {
        case 'bottom':
          this.el.style.transform = `translateY(${this.el.offsetHeight}px)`;
        break;
        case 'left':
          this.el.style.transform = `translateX(-${this.el.offsetWidth}px)`;
        break;
        case 'right':
          this.el.style.transform = `translateX(${this.el.offsetWidth}px)`;
        break;
        case 'top':
          this.el.style.transform = `translateY(-${this.el.offsetHeight}px)`;
        break;
      }
      // now report as closed
      this.container.closed(this);
    }
  }

  /** Open drawer */
  open() {
    if (this.el) {
      switch (this.position) {
        case 'left':
        case 'right':
          this.el.style.transform = `translateX(0px)`;
        break;
        case 'top':
        case 'bottom':
          this.el.style.transform = `translateY(0px)`;
        break;
      }
      // now report as open
      this.container.opened(this);
    }
  }

  // listeners

  @HostListener('window:resize') onResize() {
    this.setup();
  }

  // lifecycle methods

  ngAfterViewInit() {
    this.el = this.element.nativeElement;
    this.setup();
  }

  ngOnDestroy() {
    // don't assume completely initialized
    if (this.container)
      this.container.drawers[this.position] = null;
  }

  ngOnInit() {
    this.container = this.injector.get(DrawerContainerComponent);
    this.container.drawers[this.position] = this;
  }

  // private methods

  private setup () {
    switch (this.position) {
      case 'bottom':
        this.el.style.left = `${(this.el.parentElement.offsetWidth - this.el.offsetWidth) / 2}px`;
        this.el.style.bottom = '0';
        this.el.style.transform = `translateY(${this.el.offsetHeight}px)`;
        break;
      case 'left':
        this.el.style.height = '100%';
        this.el.style.left = '0';
        this.el.style.top = '0';
        this.el.style.transform = `translateX(-${this.el.offsetWidth}px)`;
        break;
      case 'right':
        this.el.style.height = '100%';
        this.el.style.right = '0';
        this.el.style.top = '0';
        this.el.style.transform = `translateX(${this.el.offsetWidth}px)`;
        break;
      case 'top':
        this.el.style.left = `${(this.el.parentElement.offsetWidth - this.el.offsetWidth) / 2}px`;
        this.el.style.top = '0';
        this.el.style.transform = `translateY(-${this.el.offsetHeight}px)`;
        break;
    }
  }

}
