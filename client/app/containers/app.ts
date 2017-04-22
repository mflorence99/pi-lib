import { ChangeDetectionStrategy, Component } from '@angular/core';

import { config } from '../config';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pi-root',
  templateUrl: 'app.html',
  styleUrls: ['app.less']
})

export class AppComponent {

  constructor() {
    console.log(config);
  }

}
