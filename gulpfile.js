var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	livereload = require('gulp-livereload');

gulp.task('watch', function () {
	livereload.listen();
	gulp.watch('app/**/*', ['minify', 'sass', 'copy']);
});

// treat js files
gulp.task('minify', function () {
	gulp.src('app/js/**/*.js')
		.pipe(uglify())
		//.pipe(concat('app.js'))
		.pipe(gulp.dest('build/js'))
		.pipe(livereload());
});

// treat sass files
gulp.task('sass', function () {
	gulp.src('app/sass/**/*.scss')
	    .pipe(sass())
	    .pipe(concat('style.css'))
	    .pipe(gulp.dest('build/css'))
	    .pipe(livereload());
});

// copy other files
gulp.task('copy', function () {
	gulp.src(['app/**/*', '!app/js/**/*.js', '!app/sass/**/*.scss'])
		.pipe(gulp.dest('build'))
		.pipe(livereload());
});