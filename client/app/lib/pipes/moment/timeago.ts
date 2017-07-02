import * as moment from 'moment';

import { ChangeDetectorRef, OnDestroy, Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe wrapper around moment.js
 */

@Pipe({ name: 'libTimeAgo' })

export class TimeAgoPipe implements PipeTransform, OnDestroy {
  private currentTimer;

  constructor(private _cdRef: ChangeDetectorRef) { }

  transform(value: any): string {
    const momentInstance = moment(value);
    this.removeTimer();
    const timeToUpdate = this.getSecondsUntilUpdate(momentInstance) * 1000;
    this.currentTimer = setTimeout(() => this._cdRef.markForCheck(), timeToUpdate);
    return moment(value).from(moment());
  }

  ngOnDestroy(): void {
    this.removeTimer();
  }

  private removeTimer() {
    if (this.currentTimer) {
      clearTimeout(this.currentTimer);
      this.currentTimer = null;
    }
  }

  private getSecondsUntilUpdate(momentInstance: moment.Moment) {
    const howOld = Math.abs(moment().diff(momentInstance, 'minute'));
    if (howOld < 1)
      return 1;
    else if (howOld < 60)
      return 30;
    else if (howOld < 180)
      return 300;
    else return 3600;
  }
}
