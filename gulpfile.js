var browserify = require('browserify'),
	gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	webserver = require('gulp-webserver'),
	source = require('vinyl-source-stream');

gulp.task('build', function () {
	lint();
	bundlejs();
	views();
	images();
});

gulp.task('serve', function() {
	gulp.src('./build')
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      open: true,
      fallback: 'index.html'
    }));
});

gulp.task('lint', lint);
function lint() {
	gulp.src(['app/app.js', 'app/**/*.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
}

gulp.task('browserify', bundlejs);
function bundlejs() {
	browserify('./app/app.js')
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(gulp.dest('./build'));
}

gulp.task('views', views);
function views() {
	gulp.src(['./app/index.html', './app/**/*.html'])
		.pipe(gulp.dest('./build'));
}

gulp.task('images', images);
function images() {
	gulp.src('./app/img/*')
		.pipe(gulp.dest('./build/img'));
}

gulp.task('watch', function () {
	gulp.watch(['app/img/*'], [
		'images'
	]);
	gulp.watch(['app/app.js', 'app/**/*.js'], [
		'lint',
		'browserify'
	]);
	gulp.watch(['app/index.html', 'app/**/*.html'], [
		'views'
	]);
});
