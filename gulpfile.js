var gulp = require('gulp');
var sass = require('gulp-sass');

var sassFiles = './*.scss',
		cssDest = './css';

gulp.task('sass', function () {
	return gulp.src(sassFiles)
		.pipe(sass())
		.pipe(gulp.dest(cssDest));
});

gulp.task('watch', function () {
	gulp.watch(sassFiles, ['sass']);
});
