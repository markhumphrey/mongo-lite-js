'use strict';

var browserify = require('browserify');
var gulp = require('gulp');
var jasmine = require('gulp-jasmine-phantom');
var source = require('vinyl-source-stream');

gulp.task('browserify', function() {
  return browserify('index.js', {
      standalone: 'mongolite',
      debug: true
    })
    .bundle()
    .pipe(source('mongo-lite.js'))
    .pipe(gulp.dest('bin/'));
});

gulp.task('browserify-test', function() {
  return browserify('spec/index.js', {
      debug: true
    })
    .bundle()
    .pipe(source('test.js'))
    .pipe(gulp.dest('bin/spec/'));
});

gulp.task('watch', function() {
  gulp.watch(['lib/**/*.js', 'spec/**/*.js'], ['browserify', 'browserify-test']);
});

gulp.task('test', function() {
  return gulp.src("bin/spec/test.js")
    .pipe(jasmine({
      integration: true
    }));
});

gulp.task('default', ['watch']);
