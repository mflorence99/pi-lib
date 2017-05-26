import { Component, HostListener, Input } from '@angular/core';

import { config } from '../config';

/**
 * Node finder component
 */

@Component({
  selector: 'lib-node-finder',
  styleUrls: ['node-finder.less'],
  templateUrl: 'node-finder.html'
})

export class NodeFinderComponent {
  @Input('selector') selector: string;
  @Input('text') text: string;

  // listeners

  @HostListener('click') onClick() {
    const nodes = document.querySelectorAll(this.selector);
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (node.textContent === this.text) {
        node.scrollIntoView(true);
        node.className += ' node-finder-flash';
        setTimeout(() => {
          node.className = node.className.replace(/node-finder-flash/g, '');
        }, config.nodeFinderFlashTime);
      }
    };
  }

}
