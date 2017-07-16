import { AfterViewInit, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

/**
 * The whole point of this mess is to defeat the AOT compiler and make our
 * custom directives work: @AutoUnsubscribe, @OnChange and @ToolbarControl
 *
 * @see @lucato https://github.com/angular/angular/issues/16023
 */

export class LifecycleComponent implements AfterViewInit, OnChanges, OnDestroy, OnInit {

  ngAfterViewInit() { }

  ngOnChanges(changes: SimpleChanges) { }

  ngOnDestroy() { }

  ngOnInit() { }

}
