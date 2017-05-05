/**
 * Decorator to automatically unsubscribe from anything that's subscribable
 * when a component is destroyed.
 *
 * Note sure we need this but I wanted to see how to write one.
 *
 * https://github.com/NetanelBasal/ngx-auto-unsubscribe
 *  /blob/master/dist/ngx-auto-unsubscribe.js
 */

export function AutoUnsubscribe(blacklist: string[] = []) {

  return function (ctor: Function) {
    // cache the original ngOnDestroy if any
    const original = ctor.prototype.ngOnDestroy;
    // replace it with this one:
    ctor.prototype.ngOnDestroy = function () {
      // first, look at every property that has an unsubscribe method
      // and call its unsubscribe()
      Object.keys(this).forEach(key => {
        const property = this[key];
        if (property
         && (typeof property.unsubscribe === 'function')
         && (blacklist.indexOf(key) === -1)) {
          console.log(`@AutoUnsubscribe() to ${key}`);
          property.unsubscribe();
        }
      });
      // then, execute the original ngOnDestroy
      if (original
       && (typeof original === 'function'))
        original.apply(this, arguments);
    };
  };

}
