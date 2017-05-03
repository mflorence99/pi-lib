import * as chalk from 'chalk';
import * as fs from 'fs';
import * as path from 'path';
import * as replaceStream from 'replacestream';
import * as yargs from 'yargs';

/**
 * Injects ENV into index.html during client build or server deploy.
 *
 * NOTE: only use inside soecialized build|client|server.sh scripts.
 *
 * ts-node .pi-lib/tools/homify.ts --client|server
 *
 */

const argv = yargs.argv;
const base = process.cwd();

/**
 * We use apply before ng build or ng serve. It prepares home.html
 * by injecting the build-time ENV. This is exactly what we want for testing.
 * The angular/cli toolchain will subsequently inject its own dependencies
 * as deternined by angular-cli.json into home.html.
 */

if (argv.client)
  apply(path.join(base, './client', 'index.html'),
        path.join(base, './client', 'home.html'));

/**
 * We use remove + apply before running our production Express srver, which now
 * assumes responsibility for deploying static content, taking over from ng serve.
 * We remove any build-time ENV already in <head>, taking care not to remove
 * angular/cli's own injections. Then we apply the run-time ENV back into <head>.
 */

else if (argv.server && fs.existsSync(path.join(base, './dist', 'home.html'))) {
  const stream = remove(path.join(base, './dist', 'home.html'),
                        path.join(base, './dist', 'temp.html'));
  stream.on('finish', () => {
    apply(path.join(base, './dist', 'temp.html'),
          path.join(base, './dist', 'home.html'));
  });
}

/**
 * Inject the current ENV (suitably redacted) into <head>...</head>
 */

function apply(src: string,
               dest: string) {
  console.log(chalk.cyan('Homify apply'), `${src} => ${dest}`);
  const env = Object.keys(process.env)
    .filter(k => ['PS1', 'PS2'].indexOf(k) === -1)
    .reduce((acc, k) => {
      const redacted = k.includes('SECRET') || k.includes('PASSWORD');
      const v = redacted? 'redacted' : process.env[k];
      acc[k] = v;
      return acc;
    }, {});
  const search = '</head>';
  const replace = `<script>ENV = ${JSON.stringify(env)};</script></head>`;
  return write(src, dest, search, replace);
};

/**
 * Remove any injected ENV from anywhere
 */

function remove(src: string,
                dest: string) {
  console.log(chalk.cyan('Homify remove'), `${src} => ${dest}`);
  const search = /<script>ENV.+<\/script>/;
  const replace = '';
  return write(src, dest, search, replace);
};

function write(src: string,
               dest: string,
               search: RegExp | string,
               replace: string) {
  const reader = fs.createReadStream(src);
  const writer = fs.createWriteStream(dest);
  return reader.pipe(replaceStream(search, replace)).pipe(writer);
}
