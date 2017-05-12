import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewChild } from '@angular/core';

import { MultiSelectorItem } from '../../lib/components/multi-selector';

/**
 * Test form component
 */

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'lib-test-form',
  styleUrls: ['test-form.less'],
  templateUrl: 'test-form.html'
})

export class TestFormComponent {

  @HostBinding('style.cursor') get isWorking()
    { return this.working? 'wait' : 'default'; }

  @Input() disabled = false;
  @Input() working = false;

  @ViewChild('form') form;

  feedIDs: MultiSelectorItem[] = [
    {label: 'A-Feed', value: '0100'},
    {label: 'B-Feed', value: '0200'},
    {label: 'C-Feed', value: '0300'},
    {label: 'D-Feed', value: '0400'},
    {label: 'E-Feed', value: '0500'},
    {label: 'F-Feed', value: '0600'},
    {label: 'G-Feed', value: '0700'},
    {label: 'H-Feed', value: '0800'},
    {label: 'I-Feed', value: '0900'},
    {label: 'J-Feed', value: '1000'},
    {label: 'K-Feed', value: '1100'},
    {label: 'L-Feed', value: '1200'},
    {label: 'M-Feed', value: '1300'},
    {label: 'N-Feed', value: '1400'},
    {label: 'O-Feed', value: '1500'},
    {label: 'P-Feed', value: '1600'},
    {label: 'Q-Feed', value: '1700'},
    {label: 'R-Feed', value: '1800'},
    {label: 'S-Feed', value: '1900'},
    {label: 'T-Feed', value: '2000'},
    {label: 'U-Feed', value: '2100'},
    {label: 'V-Feed', value: '2200'},
    {label: 'W-Feed', value: '2300'},
    {label: 'X-Feed', value: '2400'},
    {label: 'Y-Feed', value: '2500'},
    {label: 'Z-Feed', value: '2600'},
  ];

minutes = [
    {label: '15 mins', value: '15'},
    {label: '30 mins', value: '30'},
    {label: '1 hour', value: '60'},
    {label: '3 hours', value: '180'},
    {label: '6 hours', value: '360'},
    {label: '12 hours', value: '720'},
    {label: '24 hours', value: '1440'}
  ];

}
