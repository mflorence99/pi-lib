import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';

import { DrawerPanelComponent } from '../../lib/components/drawer-panel';
import { LifecycleComponent } from '../../lib/components/lifecycle-component';
import { OnChange } from '../../lib/decorators/onchange';
import { PolymerFormComponent } from '../../lib/components/polymer-form';
import { TestDataItem } from './datasource';

/**
 * Test saver component
 */

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'lib-test-saver',
  styleUrls: ['saver.less'],
  templateUrl: 'saver.html'
})

export class TestSaverComponent extends LifecycleComponent {

  @Input() item: TestDataItem;
  @Input() saving = false;

  @ViewChild('drawer') drawer: DrawerPanelComponent;
  @ViewChild('form') form: PolymerFormComponent;

  // bind OnChange handlers

  @OnChange('item') open() {
    if (this.item)
      this.drawer.open();
    else this.drawer.close();
  }

}
