var gulp = require("gulp");
var sass = require("gulp-sass")(require("node-sass"));
var browserSync = require("browser-sync");

// const concat = require('gulp-concat');
// const terser = require('gulp-terser'); 

const config = {
   from: "./assets/scss/style.scss",
   to: "./assets/css",
};

function scss() {
   return gulp.src(config.from)
   .pipe(sass())
   .pipe(gulp.dest(config.to))
   .pipe(browserSync.stream());
}


// function js() { 
//   return src(['./js/*.js'])
//   .pipe(concat('scripts.min.js'))
//   .pipe(terser())
//   .pipe(dest('js'))
//   .pipe(browserSync.stream());
// }

function watch() {
   browserSync.init({
      server: {
         baseDir: "./",
      },
      open: false,
   });

   gulp.watch(config.from, scss);
}

exports.scss = scss;
exports.watch = watch;
