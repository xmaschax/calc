var gulp = require('gulp');
var sass = require('gulp-sass');

var sassFiles = 'app/*.scss',
    cssDest = 'app/css/';

gulp.task('sass', function () {
  return gulp.src('app/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('app/css'));
});

gulp.task('watch', function () {
  gulp.watch('./*.scss', ['sass']);
});
