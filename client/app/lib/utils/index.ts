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
 * Decode a key that was used in a route
 *
 * NOTE: we need characters that are NOT URL encoded
 */
export function decodeRoute(key: string): string {
  return atob(key.replace(/_/g, '='));
}

/**
 * Encode a key so it can be used in a route
 *
 * NOTE: we need characters that are NOT URL encoded
 */
export function encodeRoute(key: string): string {
  return btoa(key).replace(/=/g, '_');
}

/**
 * Extract English description of HTTP error from response
 */
export function handleHttpError(error: Response): string {
  const dflt = 'Unknown error; server possibly down';
  const msg = `Status ${error.status}: ${error.statusText || dflt}`;
  console.log(`%c ${msg}`, 'color: red');
  return msg;
}

/**
 * Is this object empty?
 */
export function isObjectEmpty(obj: any): boolean {
    return (Object.getOwnPropertyNames(obj).length === 0);
}

/**
 * Make a special pi-lib search params
 */
export function makeEncodedSearchParams(): URLSearchParams {
  return new URLSearchParams('', new LibQueryEncoder());
}

/**
 * Run code on next tick
 */
export function nextTick(f: Function): void {
  setTimeout(f, 0);
}

/**
 * Parse initial search parameters
 */
export function parseInitialSearchParams(): URLSearchParams {
  const params = new URLSearchParams();
  if (location.search.length > 1) {
    const raw = location.search.substring(1).split('&');
    raw.forEach(param => {
      const [k, v] = param.split('=');
      params.set(k, v);
    });
  }
  return params;
}

/**
 * Simple map reversal
 */
export function reverseMap(obj: any): any {
  return Object.keys(obj).reduce((acc, k) => {
    acc[obj[k]] = k;
    return acc;
  }, {});
}

/**
 * Convert strings to vaadin-combo-box style items
 */
export function toVaadinItems(tokens: string[]): {label, value}[] {
  return tokens.reduce((acc, token) => {
    acc.push({label: token, value: token});
    return acc;
  }, []);
}

/**
 * Convert vaadin-combo-box style items to a lookup table
 */
export function toVaadinLookup(items: {label, value}[]): any {
  return items.reduce((acc, item) => {
    acc[item.value] = item.label;
    return acc;
  }, {});
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
