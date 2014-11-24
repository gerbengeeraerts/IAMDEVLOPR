var gulp = require('gulp'),
		browserify = require('browserify'),
		buffer = require('gulp-buffer'),
		compass = require('gulp-compass'),
		gutil = require('gulp-util'),
		jshint = require('gulp-jshint'),
		source = require('vinyl-source-stream'),
		sourcemaps = require('gulp-sourcemaps'),
		stylish = require('jshint-stylish'),
		pngquant = require('imagemin-pngquant'),
		uglify = require('gulp-uglify');
		//package = require('./package.json');

gulp.task('styles', function(){
	return gulp.src('./css/src/**/*.scss')
		.pipe(compass({
			config_file: './config.rb',
			css: './css',
			sass: 'css/src',
			environment: 'production'
		}))
		.on('error', function(err){
			gutil.log(err.message);
			gutil.beep();
			this.emit('end');
		})
		.pipe(gulp.dest('./css'))
});

gulp.task('lint', function(){
	return gulp.src('js/src/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter(stylish));
});

gulp.task('scripts', ['lint'], function(){
	var bundler = browserify({
		entries: ['./js/src/script.js'],
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
		.pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(sourcemaps.write('./', {
    	sourceRoot: '../'
    }))
		.pipe(gulp.dest('./js'))
});

gulp.task('images', function () {
	return gulp.src('img/src/**/*.png')
		.pipe(pngquant({ quality: '65-80', speed: 4 })())
		.pipe(gulp.dest('img/'));
});

gulp.task('watch', ['scripts', 'styles', 'images'], function(){
	gulp.watch(['js/src/**/*.js'], ['scripts']);
	gulp.watch(['css/src/**/*.scss'], ['styles']);
	gulp.watch(['img/src/**/*.png'], ['images']);
});
