var gulp = require('gulp')
var watchman = require('gulp-watchman')
var exit = require('gulp-exit')
var browserify = require('browserify')
var source = require('vinyl-source-stream')

gulp.task('default', () => {
    return watchman('js', {
        expression: [
            'allof', ['match', '*'],
            ['type', 'f'],
        ]
    }, ['build_no_exit'])
})

var build = () => {
    return browserify('./index.js', { debug: true })
        .transform('babelify', {
            presets: ["latest"]
        })
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./public/js'))
}

gulp.task('build_no_exit', () => build())

gulp.task('build', () => build().pipe(exit()))
