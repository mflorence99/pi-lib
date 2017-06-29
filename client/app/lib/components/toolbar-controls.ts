import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Tool bar component
 */

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'lib-toolbar-controls',
  templateUrl: 'toolbar-controls.html',
  styleUrls: ['toolbar-controls.less']
})

export class ToolbarControlsComponent { }
