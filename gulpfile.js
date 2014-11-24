// 1. Requires
var gulp = require('gulp'),
		browserify = require('browserify'),
		buffer = require('gulp-buffer'),
		compass = require('gulp-compass'),
		gutil = require('gulp-util'),
		jshint = require('gulp-jshint'),
		source = require('vinyl-source-stream'),
		sourcemaps = require('gulp-sourcemaps'),
		stylish = require('jshint-stylish'),
		browserSync = require('browser-sync'),
		uglify = require('gulp-uglify');
		//package = require('./package.json');

// 2. Stylesheet tasks
gulp.task('styles', function(){
	return gulp.src('./css/src/*.scss')
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
		.pipe(browserSync.reload({stream:true}));
});

// 3. Hinting / linting
gulp.task('lint', function(){
	return gulp.src('js/src/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter(stylish));
});

// 4. Script tasks
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
		.pipe(browserSync.reload({stream:true, once: true}));
});

gulp.task('browser-sync', function() {
		browserSync.init(null, {
				server: {
						baseDir: "."
				}
		});
});
gulp.task('bs-reload', function () {
		browserSync.reload();
});

// 5. Replacement voor default task.
//		Verander watch naar default en dan kan je gewoon `gulp` in terminal runnen ipv gulp watch
gulp.task('watch', ['scripts', 'styles', 'browser-sync'], function(){
	gulp.watch(['js/src/**/*.js'], ['scripts']);
	gulp.watch(['css/src/**/*.scss'], ['styles']);
	//gulp.watch(['./*.php'], ['bs-reload']);
});
