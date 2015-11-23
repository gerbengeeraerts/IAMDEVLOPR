var gulp = require('gulp'),
		compass = require('gulp-compass'),
		gutil = require('gulp-util'),
		uglify = require('gulp-uglify');

gulp.task('styles', function(){
	return gulp.src('./css/**/*.scss')
		.pipe(compass({
			css: './css',
			sass: './scss',
			environment: 'production'
		}))
		.on('error', function(err){
			gutil.log(err.message);
			gutil.beep();
			this.emit('end');
		})
		.pipe(gulp.dest('./css'));
});

gulp.task('watch', ['styles'], function(){
	gulp.watch(['./scss/**/*.scss'], ['styles']);
});
