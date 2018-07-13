var gulp = require('gulp')
var watchman = require('gulp-watchman')
var exit = require('gulp-exit')
var browserify = require('browserify')
var source = require('vinyl-source-stream')
var babelifyCss = require('browserify-css')

gulp.task('default', () => {
  return watchman('src', {
      expression: [
          'allof', ['match', '*'],
          ['type', 'f'],
      ]
  }, ['build_no_exit'])
})

var build = () => {
  return browserify('src/index.js', { debug: true })
      .transform('babelify', {
          presets: ["babel-preset-env", "babel-preset-react"],
      })
      .transform(babelifyCss)
      .bundle()
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('./public/js'))
}

gulp.task('build_no_exit', () => build())

gulp.task('build', () => build().pipe(exit()))
