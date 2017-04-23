import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EnvService } from '../lib/services/env';
import { config } from '../config';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pi-root',
  templateUrl: 'app.html',
  styleUrls: ['app.less']
})

export class AppComponent {

  constructor(private env: EnvService) {
    console.log(config);
    console.log(this.env);
  }

}
