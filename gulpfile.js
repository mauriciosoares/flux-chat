var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    prod  = gutil.env.prod;

gulp.task('js', function () {
  var browserify = require('browserify'),
      source     = require('vinyl-source-stream'),
      streamify  = require('gulp-streamify');

  return browserify('./app/index.js', {
      debug: !prod
    })
    .bundle()
    .pipe(source()) // convert to a stream gulp understands
    .pipe(prod ? stream(uglify()) : gutil.noop())
    .pipe(gulp.dest('./build'));
});
