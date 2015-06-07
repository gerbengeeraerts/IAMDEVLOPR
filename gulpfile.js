var gulp = require('gulp'),
		browserify = require('browserify'),
		buffer = require('gulp-buffer'),
		compass = require('gulp-compass'),
		gutil = require('gulp-util'),
		jshint = require('gulp-jshint'),
		source = require('vinyl-source-stream'),
		stylish = require('jshint-stylish'),
		tag = require('gulp-tag-version'),
		uglify = require('gulp-uglify');

gulp.task('styles', function(){
	return gulp.src('./css/**/*.scss')
		.pipe(compass({
			css: './deploy/css',
			sass: './css',
			environment: 'production'
		}))
		.on('error', function(err){
			gutil.log(err.message);
			gutil.beep();
			this.emit('end');
		})
		.pipe(gulp.dest('./deploy/css'));
});

gulp.task('lint', function(){
	return gulp.src('./js/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter(stylish));
});

gulp.task('scripts', ['lint'], function(){
	var bundler = browserify({
		entries: ['./js/script.js'],
		debug: true
	});

	return bundler.bundle()
		.on('error', function(err) {
			gutil.log(err.message);
			gutil.beep();
			this.emit('end');
		})
		.pipe(source('script.dist.js'))
		.pipe(buffer())
    .pipe(uglify())
		.pipe(gulp.dest('./deploy/js'));
});

gulp.task('tag', function () {
	return gulp.src(['./package.json'])
		.pipe(tag());
});

gulp.task('watch', ['scripts', 'styles'], function(){
	gulp.watch(['js/**/*.js'], ['scripts']);
	gulp.watch(['css/**/*.scss'], ['styles']);
});
