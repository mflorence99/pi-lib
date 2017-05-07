/**
 * Copyright (c) 2016, Chris Bauer <cbauer@outlook.com>
 *
 * Permission to use, copy, modify, and/or distribute this software for any purpose
 * with or without fee is hereby granted, provided that the above copyright notice and
 * this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
 * REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND
 * FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT,
 * OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE,
 * DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS
 * ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */

import 'rxjs/add/observable/fromEventPattern';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

export class MediaEvent {
  matches: boolean;
}

/**
 * @module WatchCSSMedia
 */
export function WatchCSSMedia () {

    function defaultTransform (event, event$) {
        return {
            matches: event.matches,
            query: event.media.substring(1, event.media.substring.length - 1),
            originalEvent: event,
            event$: event$
        };
    }

    function addQuery (query, callback, transform?): Subscription {
        transform = transform || defaultTransform;

        const mql = matchMedia(query),
            event$ = Observable.fromEventPattern(
                (cb: MediaQueryListListener) => mql.addListener(cb),
                (cb: MediaQueryListListener) => mql.removeListener(cb)
            );

        const subscription = event$.startWith({
            matches: mql.matches,
            media: query,
            originalEvent: null,
            event$: event$
        })
            .map(event => transform(event, event$))
            .subscribe(callback);

        return subscription;
    }

    return {
        /**
         * @function addQuery
         * @instance
         * @param {string} query a media query, which will be watched
         * @param {Function} callback a function to call when the media query boundary is changed
         *        Unless a transform function is provided, the callback function will be invoked
         *        with an object containing the following keys:
         *        `matches: boolean. whether (true) or not (false) the browser matches the specified query`
         *        `query: string. the original media query string`
         *        `originalEvent: Event. the original event that triggered the callback`
         *        `event$: Observable. An Observable event stream created from the MediaQueryList listener
         * @param {Function} [transform] an optional function to map the mql event object to the
         *        parameter passed into the callback
         * @return {Observable} An Observable event stream created from the MediaQueryList listener
         * @description
         * General function to create a media query listener from a specified media query
         */
        addQuery: (query, callback, transform?): Subscription => {
            return addQuery(query, callback, transform);
        },
        /**
         * @function addQueries
         * @instance
         * @param {Array} args an array of {query, callback, transform} objects
         * @return {Observable[]} An Array of Observable event streams created from the MediaQueryList listeners
         * @description
         * Shortcut method to add multiple listeners. Each element in the arguments array corresponds to the
         * parameters of {@link module:WatchCSSMedia#addQuery|addQuery}
         */
        addQueries: (args) => {
            if (!Array.isArray(args)) {
                throw new Error('expected Array but received ' + JSON.stringify(args));
            }
            return args.map( (arg) => addQuery.apply(addQuery, arg));
        },
        /**
         * @function onOrientationChange
         * @instance
         * @param {Function} callback a callback function to execute when the orientation changes
         *        The callback function will be invoked with an object containing the following keys:
         *        `isLandscape: boolean. whether (true) or not (false) the device is now in landscape orientation`
         *        `isPortrait: boolean. whether (true) or not (false) the device is now in portrait orientation`
         *        `query: string. the original media query string`
         *        `originalEvent: Event. the original event that triggered the callback`
         *        `event$: Observable. An Observable event stream created from the MediaQueryList listener
         * @returns {Observable} An Observable event stream created from the MediaQueryList listener
         * @description
         * Shortcut method to add an event listener for orientation changes
         */
        onOrientationChange: (callback): Subscription => {
            const query = '(orientation: landscape)';
            return addQuery(query, callback,
                (event, event$) => {
                    return {
                        isLandscape: event.matches,
                        isPortrait: !event.matches,
                        query: query,
                        originalEvent: event,
                        event$: event$
                    };
                }
            );
        },
        /**
         * @function onWidthGreaterThan
         * @instance
         * @param {string} min a string representing the minimum width, including units (e.g. '500px')
         * @param {Function} callback a callback function to execute when the browser width crosses the threshold
         *        Unless a transform function is provided, the callback function will be invoked
         *        with an object containing the following keys:
         *        `matches: boolean. whether (true) or not (false) the browser is wider than the provided width`
         *        `query: string. the original media query string`
         *        `originalEvent: Event. the original event that triggered the callback`
         *        `event$: Observable. An Observable event stream created from the MediaQueryList listener
         * @param {Function} [transform] an optional function to map the mql event object to the
         *        parameter passed into the callback
         * @returns {Observable} An Observable event stream created from the MediaQueryList listener
         * @description
         * Shortcut method to add an event listener for browser width changes. This allows for easy
         * creation of callbacks that fire when the browser crosses certain width thresholds without
         * having to use `window.on('resize');`
         */
        onWidthGreaterThan: (min, callback, transform?): Subscription => {
            return addQuery(`(min-width: ${min})`, callback, transform);
        },
        /**
         * @function onWidthLessThan
         * @instance
         * @param {string} min a string representing the maximum width, including units (e.g. '500px')
         * @param {Function} callback a callback function to execute when the browser width crosses the threshold
         *        Unless a transform function is provided, the callback function will be invoked
         *        with an object containing the following keys:
         *        `matches: boolean. whether (true) or not (false) the browser is narrower than the provided width`
         *        `query: string. the original media query string`
         *        `originalEvent: Event. the original event that triggered the callback`
         *        `event$: Observable. An Observable event stream created from the MediaQueryList listener
         * @param {Function} [transform] an optional function to map the mql event object to the
         *        parameter passed into the callback
         * @returns {Observable} An Observable event stream created from the MediaQueryList listener
         * @description
         * Shortcut method to add an event listener for browser width changes. This allows for easy
         * creation of callbacks that fire when the browser crosses certain width thresholds without
         * having to use `window.on('resize');`
         */
        onWidthLessThan: (max, callback, transform?): Subscription => {
            return addQuery(`(max-width: ${max})`, callback, transform);
        }

    };
};
