import { AfterViewInit, ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { PolymerForm, PolymerFormComponent, PolymerFormValuesMap } from '../../lib/components/polymer-form';

import { AutoUnsubscribe } from '../../lib/decorators/auto-unsubscribe';
import { DrawerPanelComponent } from '../../lib/components/drawer-panel';
import { LifecycleComponent } from '../../lib/components/lifecycle-component';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

/**
 * Model selected columns
 */

export class SelectedColumn {
  constructor(public field: string,
              public header: string) { }
}

/**
 * Test selector component
 */

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'lib-test-selector',
  styleUrls: ['selector.less'],
  templateUrl: 'selector.html'
})

@AutoUnsubscribe()
export class TestSelectorComponent extends LifecycleComponent
                                   implements AfterViewInit {

  @ViewChild('drawer') drawer: DrawerPanelComponent;
  @ViewChild('form') form: PolymerFormComponent;

  allFields = [
    'firstName',
    'lastName',
    'emailAddress',
    'jobTitle',
    'phoneNumber',
    'city',
    'state',
    'amount'
  ];

  allHeaders = [
    'First Name',
    'Last Name',
    'Email Address',
    'Job Title',
    'Phone Number',
    'City',
    'State',
    'Balance'
  ];

  columns = new Subject<SelectedColumn[]>();

  private subToForm: Subscription;

  // lifecycle methods

  ngAfterViewInit() {
    this.subToForm = this.form.stream
      .map((data: PolymerForm) => data.values)
      .subscribe((settings: PolymerFormValuesMap) => {
        const selected = Object.keys(settings).reduce((acc, setting) => {
          if (settings[setting]) {
            const ix = this.allFields.indexOf(setting);
            acc.push(new SelectedColumn(setting, this.allHeaders[ix]));
          }
          return acc;
        }, []);
        this.columns.next(selected);
      });
  }

}
