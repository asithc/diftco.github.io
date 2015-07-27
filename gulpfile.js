
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
var responsive = require('gulp-responsive');

/**
 * Build output dir
 */

var build_dir = 'build';

/**
 * File references
 */

var files = {
  app_js: 'js/app.jsx'
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
 * Responsive images
 */

gulp.task('build:img-projects', function () {
  var w = 100;

  return gulp
    .src(['img/projects/*.jpg', '!img/projects/*-*.jpg'])
    .pipe(responsive({
      'alantu.jpg': [
        {
          width: w,
          rename: 'alantu-low.jpg'
        }
      ],
      'dift.jpg': [
        {
          width: w,
          rename: 'dift-low.jpg'
        }
      ],
      'ingame.jpg': [
        {
          width: w,
          rename: 'ingame-low.jpg'
        }
      ]
    }))
    .pipe(gulp.dest('img/projects'));
});

gulp.task('build:img-team', function () {
  var w = 20;

  return gulp
    .src(['img/team/*.jpg', '!img/team/*-*.jpg'])
    .pipe(responsive({
      'mati.jpg': [
        {
          width: w,
          rename: 'mati-low.jpg'
        }
      ],
      'conan.jpg': [
        {
          width: w,
          rename: 'conan-low.jpg'
        }
      ],
      'vic.jpg': [
        {
          width: w,
          rename: 'vic-low.jpg'
        }
      ],
      'jpg.jpg': [
        {
          width: w,
          rename: 'jpg-low.jpg'
        }
      ],
      'mono.jpg': [
        {
          width: w,
          rename: 'mono-low.jpg'
        }
      ],
      'gon.jpg': [
        {
          width: w,
          rename: 'gon-low.jpg'
        }
      ],
      'charly.jpg': [
        {
          width: w,
          rename: 'charly-low.jpg'
        }
      ]
    }))
    .pipe(gulp.dest('img/team'));
});

gulp.task('build:img', ['build:img-team', 'build:img-projects']);

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

gulp.task('default', ['build:deps', 'build:css', 'build:js', 'build:img']);

