var gulp = require('gulp');
var karma = require('karma').server;
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var path = require('path');
var plumber = require('gulp-plumber');
var runSequence = require('run-sequence');
var jshint = require('gulp-jshint');
var scss = require('gulp-scss');
var concatCss = require('gulp-concat-css');
var templateCache = require('gulp-angular-templatecache');
var eventStream = require('event-stream');
var connect = require('gulp-connect');
var stripDebug = require('gulp-strip-debug');

/**
 * File patterns
 **/

// Root directory
var rootDirectory = path.resolve('./');

// Source directory for build process
var sourceDirectory = path.join(rootDirectory, './modules');

var buildSourceFiles = [
    path.join(sourceDirectory, '/ng-pagination-ljs/directives/ng-pagination-ljs.js'),
];

gulp.task('build', function() {
  return eventStream.merge(gulp.src(buildSourceFiles))
    .pipe(plumber())
    .pipe(stripDebug())
    .pipe(concat('ng-pagination-ljs.js'))
    .pipe(gulp.dest('./dist/'))
    .pipe(uglify())
    .pipe(rename('ng-pagination-ljs.min.js'))
    .pipe(gulp.dest('./dist'));
});

/**
 * Process
 */
gulp.task('process-all', function (done) {
  runSequence('jshint', 'connect', 'build', done);
});

/**
 * Validate source JavaScript
 */
gulp.task('jshint', function () {
  gulp.src(buildSourceFiles)
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

/**
 * Setup dev server for testing
 */
gulp.task('connect', function() {
    connect.server({
        root: './',
        port: '4000',
        livereload: true
    });
});

gulp.task('default', function () {
  runSequence('process-all');
});
