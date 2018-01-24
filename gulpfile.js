const gulp = require('gulp');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');

function ourErrorHandler(error){
    console.log(error.toString());
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
    return gulp.src('src/styles/scss/main.scss')
      .pipe(plumber({
          errorHandler :ourErrorHandler
      }))
      .pipe(sourcemaps.init())
      .pipe(sass({// wyglad css
        outputStyle: "compressed" //nested, expanded, compact, compressed
      }))
      .pipe(autoprefixer({
          browsers: ['last 2 versions']
      }))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('dist/css'))
      .pipe(browserSync.stream({match: "**/*.css"}));
});

gulp.task('script', function() {
    return gulp.src('src/**/*.js')
    .pipe(babel({"presets": ["es2015"]}))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('watch', function () {
    gulp.watch('src/**/*.scss', ['sass']);
    gulp.watch("src/**/*.js", ['script']);
    gulp.watch("**/*.html").on("change", browserSync.reload);
  });

gulp.task("default", function() {
    console.log("----rozpoczynamy pracę-----");
    gulp.start(['sass', 'browseSync', 'script', 'watch' ]);
})