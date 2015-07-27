var gulp = require('gulp');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');

gulp.task('develop', function() {
  var bundler = browserify({
    entries: ['./app/index.js'],
    transform: [reactify],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  });

  var watcher = watchify(bundler);

  return watcher
    .on('update', function() {
      console.log('start build');
      watcher.bundle() // starts the bundle
        .pipe(source('index.js'))
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build/'));
      console.log('finish build');
    })
    .bundle()
    .pipe(source('index.js'))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./build/'));
});
