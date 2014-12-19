var gulp = require('gulp'),
		browserify = require('browserify'),
		buffer = require('gulp-buffer'),
		compass = require('gulp-compass'),
		gutil = require('gulp-util'),
		jshint = require('gulp-jshint'),
		source = require('vinyl-source-stream'),
		stylish = require('jshint-stylish'),
		imagemin = require('gulp-imagemin'),
		pngquant = require('imagemin-pngquant'),
		header = require('gulp-header'),
		uglify = require('gulp-uglify'),
		pkg = require('./package.json');

var disclaimer = ['/**',
	' * <%= pkg.name %> - <%= pkg.description %>',
	' * version v<%= pkg.version %>',
	' * license <%= pkg.license %>',
	' * © <%= pkg.author %> & Thibault Maekelbergh',
	' */',
''].join('\n')

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
		debug: false
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
		.pipe(header(disclaimer, { pkg: pkg }))
		.pipe(gulp.dest('./js'))
});

gulp.task('images', function () {
	return gulp.src('img/src/**/*')
		.pipe(imagemin({
			progressive: true,
			use: [pngquant()]
		}))
		.pipe(gulp.dest('img/'));
});

gulp.task('watch', ['scripts', 'styles', 'images'], function(){
	gulp.watch(['js/src/**/*.js'], ['scripts']);
	gulp.watch(['css/src/**/*.scss'], ['styles']);
	gulp.watch(['img/src/**/*'], ['images']);
});
