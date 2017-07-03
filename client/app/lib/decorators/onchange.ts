import { SimpleChanges } from '@angular/core';

/**
 * Decorator to simplify OnChanges handling
 */

export function OnChange(...inputs: string[]) {

  /**
   * Create ngOnChanges
   */

  function init(ctor, method) {
    const ngOnChanges = ctor.prototype.ngOnChanges;
    ctor.prototype.ngOnChanges = function () {
      // what changed?
      const changes: SimpleChanges = arguments[0];
      const changed: boolean[] = inputs.map(input => changes[input] != null);
      // if anything changed, call handler
      if (changed.some(item => item))
         method.apply(this, changed);
      // execute the original ngOnChanges
      if (ngOnChanges
       && (typeof ngOnChanges === 'function'))
        ngOnChanges.apply(this, arguments);
    };
  }

  /**
   * Decorator itself
   */

  return function(target: Object,
                  propertyKey: string,
                  descriptor: TypedPropertyDescriptor<any>): any {
    const ctor = target['constructor'];
    init(ctor, descriptor.value);
    return descriptor;
  };

}
