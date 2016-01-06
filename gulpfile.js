var browserify = require('browserify'),
	parcelify = require('parcelify'),
	gulp = require('gulp'),
	gulpif = require('gulp-if'),
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
	webserver = require('gulp-webserver'),
	buffer = require('vinyl-buffer'),
	source = require('vinyl-source-stream');

var prod = true;

gulp.task('dev', function () {
	prod = false;
});

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
	var parcelifyDest = 'build/bundle.css';
	var b = browserify({
	        entries: './app/app.js',
	        debug: true
	    })

	parcelify(b, {
            bundles : {
  				style : parcelifyDest   // bundle `style` assets and output here
			}
    })

	b.bundle()
	.pipe(source('bundle.js'))
	.pipe(buffer())
	.pipe(gulpif(prod, uglify({"mangle":false})))
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
