var gulp = require('gulp');
var sass = require('gulp-sass');

<<<<<<< HEAD
var sassFiles = 'app/*.scss',
	cssDest = 'app/css/';
=======
var sassFiles = './*.scss',
	cssDest = './';
>>>>>>> 628023eaa1070d516ba30add24020907d047bb55

gulp.task('sass', function () {
	return gulp.src(sassFiles)
		.pipe(sass())
		.pipe(gulp.dest(cssDest));
});

gulp.task('watch', function () {
	gulp.watch(sassFiles, ['sass']);
});
