var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function () {
	return gulp.src('./*.scss')
		.pipe(sass()) // sass function von der lib gulp-sass
		.pipe(gulp.dest('./')); // legt den ziel "ordner" fest
});

gulp.task('watch', function () {
	gulp.watch('./*.scss', ['sass']);
});
