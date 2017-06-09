import * as clean from 'gulp-clean-css';
import * as gulp from 'gulp';
import * as gulpif from 'gulp-if';
import * as minifyHTML from 'gulp-htmlmin';
import * as minifyJS from 'gulp-uglify/minifier';
import * as path from 'path';
import * as polymer from 'polymer-build';
import * as rename from 'gulp-rename';
import * as uglify from 'uglify-js-harmony';
import * as util from 'gulp-util';
import * as vulcanize from 'gulp-vulcanize';
import * as yargs from 'yargs';

const argv = yargs.argv;

/**
 * Vulcanize elements.html and all its dependencies
 */

gulp.task('default', () => {
  const splitter = new polymer.HtmlSplitter();
  return gulp.src(path.join(argv.source, 'elements.html'))
    .pipe(vulcanize({
        inlineCss: true,
        inlineScripts: true,
        stripComments: true
      }))
    .pipe(splitter.split())
    // NOTE: js minification effectively a no-op
    // Uncaught TypeError: Cannot read property 'bindings' of undefined
    .pipe(gulpif(/\.js$/, minifyJS({
        mangle: false
      }, uglify)))
    .on('error', err => util.log(util.colors.red('[JS Error]'), err.toString()))
    .pipe(gulpif(/\.css$/, clean()))
    .on('error', err => util.log(util.colors.red('[CSS Error]'), err.toString()))
    .pipe(gulpif(/\.html$/, minifyHTML({
        caseSensitive: true,
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true,
        decodeEntities: true,
        minifyHTMLCSS: true,
        removeAttributeQuotes: true,
        removeComments: true
      })))
    .on('error', err => util.log(util.colors.red('[HTML Error]'), err.toString()))
    .pipe(splitter.rejoin())
    .pipe(rename('vulcanized.html'))
    .pipe(gulp.dest(argv.source));
});
