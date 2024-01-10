var gulp = require("gulp");
var sass = require("gulp-sass")(require("node-sass"));
var browserSync = require("browser-sync");

// const concat = require('gulp-concat');
const terser = require('gulp-terser'); 

function scss() {
   return gulp.src('assets/scss/*.scss')
   .pipe(sass())
   .pipe(gulp.dest('dist/css'))
   .pipe(browserSync.stream());
}


function js() { 
  return gulp.src(['assets/js/*.js'])
//   .pipe(concat('scripts.min.js'))
  .pipe(terser())
  .pipe(gulp.dest('dist/js'))
//   .pipe(browserSync.stream());
}

function watch() {
   browserSync.init({
      server: {
         baseDir: "./",
      },
      open: false,
   });

   gulp.watch(config.from, scss);
}

function build () {
   scss();
   js();

}

exports.scss = scss;
exports.js = js;
exports.default = gulp.series(scss, js);

