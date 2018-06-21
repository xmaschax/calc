var gulp = require('gulp');
var sass = require('gulp-sass');

var sassFiles = 'app/*.scss';
var cssDest = 'app/css/';

gulp.task('sass', function(){
    gulp.src(sassFiles)
        .pipe(sass())
        .pipe(gulp.dest(cssDest));
});
