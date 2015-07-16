
/**
 * Module dependencies
 */

var del = require('del');
var gulp = require('gulp');
var filter = require('gulp-filter');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var cssmin = require('gulp-minify-css');
var mainBowerFiles = require('main-bower-files');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var merge = require('merge2');
var less = require('gulp-less');

/**
 * Build output dir
 */

var build_dir = 'build';

/**
 * File references
 */

var files = {
  app_js: 'js/index.js'
};

/**
 * Paths
 */

var paths = {
  js: ['*.js', 'js/**/*.js', 'js/**/*.jsx'],
  css: ['css/*.css']
};

/**
 * Clean
 */

gulp.task('clean', function(end) {
  del(['dist/**'], end);
});

/**
 * Build components task
 */

gulp.task('build:deps-js', function() {
  var jsFilter = filter('*.js');

  return gulp

    // js build
    .src(mainBowerFiles())
    .pipe(jsFilter)
    .pipe(concat('deps.js'))
    .pipe(gulp.dest(build_dir))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(build_dir))
    .pipe(jsFilter.restore());
});

/**
 * Build components task
 */

gulp.task('build:deps-css', function() {
  var cssFilter = filter('*.css');
  var lessFilter = filter('*.less');

  var cssStream = gulp
    .src(mainBowerFiles())
    .pipe(cssFilter);

  var lessStream = gulp
    .src(mainBowerFiles())
    .pipe(lessFilter)
    .pipe(less());
    
  return merge(cssStream, lessStream)
    .pipe(concat('deps.css'))
    .pipe(gulp.dest(build_dir))
    .pipe(cssmin())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(build_dir));
});

/**
 * Build all deps
 */

gulp.task('build:deps', ['build:deps-js', 'build:deps-css']);

/**
 * Build app js
 */

gulp.task('build:js', function() {
  browserify(files.app_js)
    .transform(reactify)
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest(build_dir));
});

/**
 * Build app css
 */

gulp.task('build:css', function() {
  gulp.src(paths.css)
    .pipe(concat('app.css'))
    .pipe(gulp.dest(build_dir));
});

/**
 * Watch for changes & rebuild
 */

gulp.task('watch', function() {
  gulp.watch(paths.css, ['build:css']);
  gulp.watch(paths.js, ['build:js']);
});

/**
 * Default task
 */

gulp.task('default', ['build:deps', 'build:css', 'build:js']);

