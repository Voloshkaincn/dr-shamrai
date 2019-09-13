var gulp 	 	     = require('gulp'),
		sassToCss 	 = require('gulp-sass'),
		concat       = require("gulp-concat"),
		uglifyjs     = require("gulp-uglify"),
		//uglifycss    = require("gulp-uglifycss"),
		cleanCSS = require('gulp-clean-css');
		autoprefixer = require("gulp-autoprefixer"),
		rename       = require("gulp-rename"),
		browserSync  = require('browser-sync').create(),
		sourcemaps = require('gulp-sourcemaps'),
		cssnano = require('gulp-cssnano'),
		iconfont = require('gulp-iconfont'),
		iconfontCss = require('gulp-iconfont-css');
var		fontName = 'iconfont';

//Compile CSS file from Sass
gulp.task('compileSass', function(){
	return gulp.src(['src/sass/**/*.{sass,scss}'])
	.pipe(sourcemaps.init())
	.pipe(sassToCss({outputStyle: 'expanded'}).on('error', sassToCss.logError))
	.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
	.pipe(cleanCSS())
    .pipe(cssnano())
    .pipe(rename({suffix: '.min'}))
    .on('error', function (err) {
            console.error('Error!', err.message);
        })
    .pipe(sourcemaps.write())
	.pipe(gulp.dest('src/css'))
	.pipe(browserSync.stream({match: '**/*.css'}));
});

//Concat all library js files into libs.min.js
gulp.task('createJsLibs', function(){
	return gulp.src([
			'src/libs/slick-1.8.1/slick/slick.min.js',
			'src/libs/lightbox/dist/js/lightbox.min.js',
		])
	.pipe(concat('libs.min.js'))
	.pipe(uglifyjs())
	.pipe(gulp.dest('src/js'))
	.pipe(browserSync.stream({match: '**/*.css'}));
});

//Compress JSFiles
gulp.task('compressJs', function(){
	return gulp.src([
			'src/js/common.js'
		])
	.pipe(uglifyjs())
	.pipe(rename({
		suffix: ".min"
	}))
	.pipe(gulp.dest('src/js'))
	.pipe(browserSync.stream({match: '**/*.js'}));
});

gulp.task('code', function(){
	return gulp.src([
			'*.{php, html}'
		])
	.pipe(browserSync.reload({stream: true}));
});

// LiveReload
// gulp.task('browserSync', function serverStart(){
// 	browserSync.init({
// 		proxy: "./src/"
// 	});
// });
// });
gulp.task('browserSync', function() {
    browserSync.init({
       server: {
            baseDir: "./"
        }
    });
});


// Watch
gulp.task('watch', gulp.parallel('code', 'compileSass', 'createJsLibs', 'compressJs', 'browserSync', function startWatching(){
	gulp.watch('src/sass/**/*.{css,sass,scss}', gulp.parallel('compileSass'));
	gulp.watch('src/js/common.js', gulp.parallel('compressJs'));
	gulp.watch('*.{php,html}', gulp.parallel('code')).on('change', browserSync.reload);
}));

// Default Gulp function
gulp.task('default', gulp.parallel('watch'));