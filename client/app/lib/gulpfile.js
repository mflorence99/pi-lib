var del = require('del');
var gulp = require('gulp');
var inliner = require('gulp-inline-ng2-template');
var less = require('less');
var merge = require('merge-stream');
var minifier = require('html-minifier');
var ngc = require('gulp-ngc');
var path = require('path');

// globals
var source = path.join(process.cwd(), './');
var target = path.join(process.cwd(), './dist');

function build() {
  return merge(
    compile()
  );
}

function clean() {
  return del([path.join(target, '**/*')], {force: true});
}

function preProcess() {
  return merge(
    copyRoot(),
    inline()
  );
}

// compile TypeScript --> JavaScript
function compile() {
  return ngc('./lib.tsconfig.json');
}

// copy root files
function copyRoot() {
  var globs = [
    path.join(source, 'theme.html'),
    path.join(source, 'package.json')
  ];
  return gulp.src(globs)
    .pipe(gulp.dest(target));
}

// inline styles and templates
function inline() {
  var globs = [
    path.join(source, '**/*.ts')
  ];
  return gulp.src(globs)
    .pipe(inliner({
        base: './',
        removeLineBreaks: true,
        styleProcessor: toCSS,
        templateProcessor: minify,
        useRelativePaths: true
      }))
    .pipe(gulp.dest(target));
}

// minify HTML
function minify(path, ext, file, cb) {
  var output = minifier.minify(file, {
    caseSensitive: true,
    collapseInlineTagWhitespace: true,
    collapseWhitespace: true,
    decodeEntities: true,
    minifyCSS: true,
    removeAttributeQuotes: true,
    removeComments: true
  });
  cb(null, output);
}

// convert styles to CSS
function toCSS(path, ext, file, cb) {
  less.render(file, {compress: true}, function(e, output) {
    cb(null, output.css);
  });
}

// gulp tasks

gulp.task('clean', function() {
  return clean();
});

gulp.task('pre-process', ['clean'], function() {
  return preProcess();
});

gulp.task('build', ['pre-process'], function() {
  return build();
});

gulp.task('default', ['build']);
