import { Response, URLSearchParams } from '@angular/http';

import { LibQueryEncoder } from './query-encoder';

/**
 * Common utility functions
 */

/**
 * Simple debounce; useful when no stream is at play
 */
export function debounce(func: Function,
                         wait = 0,
                         immediate = false): Function {
  let timeout = null;
  return function() {
    const context = this;
    const args = arguments;
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      timeout = null;
      if (!immediate)
        func.apply(context, args);
    }, wait);
    if (callNow)
      func.apply(context, args);
  };
}

/**
 * Deep copy an object, albeit not terribly efficiently
 */
export function deepCopy<T>(obj: T): T {
  return <T>JSON.parse(JSON.stringify(obj));
}

/**
 * Extract English description of HTTP error from response
 */
export function handleHttpError(error: Response): string {
  const dflt = 'Unknown error; server possibly down';
  const msg = `Status ${error.status}: ${error.statusText || dflt}`;
  console.log(msg);
  return msg;
}

/**
 * Make a special pi-lib search params
 */
export function makeSearchParams(): URLSearchParams {
  return new URLSearchParams('', new LibQueryEncoder());
}

/**
 * Guarantee unique string
 */
const uniqueCache: { [label: string]: boolean } = {};

export function unique<T>(label: T | ''): T {
  if (uniqueCache[<string>label])
    throw new Error(`${label} is not unique`);
  uniqueCache[<string>label] = true;
  return <T>label;
}
