import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * An action button, replaced by a spinner when working
 */

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'lib-working-button',
  styleUrls: ['working-button.less'],
  templateUrl: 'working-button.html'
})

export class WorkingButtonComponent {
  @Input() disabled: boolean;
  @Input() working: boolean;

  @Output() submit = new EventEmitter<any>();

  /** Forward click events */
  onClick(event) {
    this.submit.emit(event);
  }

}
