// Подключение пакетов и задач для Gulp
var gulp = require('gulp');

var browserSync = require('browser-sync').create();

var less = require('gulp-less');

var concat = require('gulp-concat');

var sourcemaps = require('gulp-sourcemaps');

var postcss = require('gulp-postcss');

var autoprefixer = require('autoprefixer');

var minify = require('gulp-csso');

var rename = require('gulp-rename');

var imagemin = require('gulp-imagemin');

var svgstore = require('gulp-svgstore');

var posthtml = require('gulp-posthtml');

var include = require('posthtml-include');

gulp.task('less', function(){

		return gulp.src('./src/less/*.less')
        .pipe(sourcemaps.init())
				.pipe(less())
				.pipe(postcss([
        	autoprefixer()
        ]))
				
        .pipe(concat('styles.css'))
        .pipe(sourcemaps.write())
        
	 	  	.pipe(gulp.dest('./dest/css/'))
	 	  	.pipe(minify())
	 	  	.pipe(rename('styles.min.css'))
	 	  	.pipe(gulp.dest('./dest/css/'))

});

gulp.task('sprite', function() {
		return gulp.src("src/img/m-*.svg")
				.pipe(svgstore({
					inLineSvg: true
				}))
				.pipe(rename('sprite.svg'))
				.pipe(gulp.dest('dest/img'))
})

gulp.task('html', function(){
		return gulp.src('./src/*.html')
					.pipe(posthtml([
						 include()
					]))
					.pipe(gulp.dest('./dest/'));
					
});

gulp.task('img', function(){
		return gulp.src('./src/img/**/*.{png,jpg,svg}')

					.pipe(imagemin([
						imagemin.optipng({quality: 55, optimizationLevel: 5}),
						imagemin.jpegtran({progressive: true}),
						imagemin.svgo()
					]))
					.pipe(gulp.dest('./dest/img/'));

})

gulp.task('js', function(){
  return gulp.src('./src/js/*.*')
        .pipe(gulp.dest('./dest/js/'));

})

gulp.task('server', function() {

	browserSync.init({

		server: {baseDir: './dest',
						 index: 'index.html'},
        		 browser: 'chrome'

	});
  gulp.watch('src/**/*.html').on('change', gulp.series('html'));
	gulp.watch('dest/**/*.html').on('change', browserSync.reload);
  // gulp.watch('src/**/*.css').on('change', browserSync.reload);
  
  gulp.watch('src/js/*.js').on('change', gulp.series('js'));
	gulp.watch('dest/**/*.js').on('change', browserSync.reload);

	// gulp.watch('src/**/*.js').on('change', browserSync.reload);
	gulp.watch('src/**/*.less',gulp.series('less'));
	gulp.watch('dest/css/**/*.css').on('change', browserSync.reload);

	gulp.watch('src/img/**/*', gulp.series('img'));
	gulp.watch('dest/img/**/*').on('change', browserSync.reload);

})

// gulp.task('task-before',async function() {
// 	console.log('Hello from gulp!');
// });

// gulp.task('hello', async function() {
// 	console.log('Next');
// });



gulp.task('default', gulp.series('server'));


// gu