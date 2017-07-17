import gulp from 'gulp';
import print from 'gulp-print';
import gulp_webpack from 'gulp-webpack';
import gulp_watch from 'gulp-watch';
import vinyl_named from 'vinyl-named';
import path from 'path';

gulp.task('pack', function() {
  return gulp_watch('src/**/*.js', function() {
    gulp.src('src/**/*.js')
    .pipe(print())
    .pipe(vinyl_named())
    .pipe(gulp_webpack({
      module: {
        loaders: [
          { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
          { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
        ]
      },
      resolve: {
        root: [ path.resolve('./src'), path.resolve('./') ]
      }
    }))
    .pipe(gulp.dest('public'));
  })
});
