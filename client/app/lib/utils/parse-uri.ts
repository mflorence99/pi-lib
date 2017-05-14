// parseUri 1.2.2
// (c) Steven Levithan <stevenlevithan.com>
// MIT License

export function parseURI(str) {

  const OPTIONS = {
    strictMode: false,
    key: [
      'source',
      'protocol',
      'authority',
      'userInfo',
      'user',
      'password',
      'host',
      'port',
      'relative',
      'path',
      'directory',
      'file',
      'query',
      'anchor'
    ],
    q: {
      name: 'queryKey',
      parser: /(?:^|&)([^&=]*)=?([^&]*)/g
    },
  	/* tslint:disable:max-line-length */
    parser: {
      strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
      loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
    }
  };

  const m = OPTIONS.parser[OPTIONS.strictMode ? 'strict' : 'loose'].exec(str), uri = {};
  let i = OPTIONS.key.length;

  while (i--) uri[OPTIONS.key[i]] = m[i] || '';

  uri[OPTIONS.q.name] = {};
  uri[OPTIONS.key[12]].replace(OPTIONS.q.parser, function($0, $1, $2) {
    if ($1) uri[OPTIONS.q.name][$1] = $2;
  });

  return uri;
};
