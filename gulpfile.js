const gulp = require('gulp');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const gutil = require('gulp-util');
const babel = require('gulp-babel');

var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');



function ourErrorHandler(error) {
    console.log(error.toString());
    console.log(gutil.colors.red(error.toString()));
    this.emit('end');
}

gulp.task("browseSync", function() {
    browserSync.init({
        server: ".",
        notify: true,
        //host: "192.168.0.24", //IPv4 Address Wirless LAN adapter WiFi from ipconfig
        //port: 3000,
        open: true //czy otwierac strone
    });
});


gulp.task('sass', function () {
    return gulp.src('./scss/main.scss')
      .pipe(plumber({
          errorHandler : ourErrorHandler
      }))
      .pipe(sourcemaps.init())
      .pipe(sass({
        outputStyle: "compressed" //nested, expanded, compact, compressed
        }))
      .pipe(autoprefixer({
            browsers: ['last 2 versions'],
        }))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('./dist/css'))
      .pipe(browserSync.stream({match: "**/*.css"}));      
  });

gulp.task('watch', function () {
    gulp.watch('./scss/**/*.scss', ['sass'])
    gulp.watch("**/*.html").on("change", browserSync.reload);    
    // gulp.watch('**/*.js', ['es6'])
});



gulp.task('es6', function() {
	browserify({
    	entries: 'src/scripts/app.js',
    	debug: true
  	})
    .transform(babelify.configure({
        presets: ["env"]
    }))
    .on('error',gutil.log)
    .bundle()
    .on('error',gutil.log)
    .pipe(source('dist/js/out.js'))
    .pipe(gulp.dest(''));
});

gulp.task('default', function() {
    console.log('----------rozpoczynamy pracę--------');
    gulp.start(['sass', 'es6', 'browseSync', 'watch']);
})
