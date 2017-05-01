import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EnvService } from '../lib/services/env';
import { config } from '../config';

/**
 * pi-lib demo app root
 */

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pi-root',
  templateUrl: 'root.html',
  styleUrls: ['root.less']
})

export class RootComponent {

  constructor(env: EnvService) {
    console.log('<pi-root> loading', config, env);
  }

}
