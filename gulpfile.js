var gulp = require("gulp");
// hot reload
var browserSync = require("browser-sync");
// scss
var sass = require("gulp-sass")(require("sass-embedded"));
var concat = require("gulp-concat");
// html
var minHTML = require("gulp-htmlmin");
var processhtml = require("gulp-processhtml");
// js
const terser = require("gulp-terser");

function buildScss() {
   return gulp
      .src("assets/**/*.scss")
      // .pipe(sourceMap.init())

      .pipe(sass({ outputStyle: "compressed" }))
      .pipe(concat("all.css"))
      // .pipe(sourceMap.write("."))

      .pipe(gulp.dest("dist/css"))
      // .pipe(browserSync.stream());
}

function watchScss() {
   return gulp
      .src("assets/scss/*.scss")
      .pipe(sass())
      .pipe(gulp.dest("assets/css"))
      .pipe(browserSync.stream());
}

function buildImage() {
   return gulp.src("assets/images/*").pipe(gulp.dest("dist/images"));
}


function buildFonts() {
   return gulp.src("assets/fonts/*").pipe(gulp.dest("dist/fonts"));
}

function buildJs() {
   return gulp
      .src(["assets/**/*.js"])
      // .pipe(sourceMap.init())
      .pipe(terser())
      // .pipe(sourceMap.write("."))
      .pipe(gulp.dest("dist"));
}

function watchJs() {
   return gulp.src(["assets/**/*.js"]).pipe(browserSync.stream());
}

function buildHtml() {
   return gulp
      .src("./index.html")
      .pipe(processhtml())
      // .pipe(replace({
      //    patterns: [
      //       {
      //           match: /assets/g,
      //           replacement: 'my/stuff'
      //       }
      //   ]
      // }))
      .pipe(minHTML({ collapseWhitespace: true }))
      .pipe(gulp.dest("dist"))
      // .pipe(browserSync.stream());
}

function watchHtml() {
   return gulp.src("./index.html").pipe(browserSync.stream());
}

function preview() {
   browserSync.init({
      server: {
         baseDir: "./dist",
      },
      open: false,
   });
}

function watch() {
   browserSync.init({
      server: {
         baseDir: "./",
      },
      open: false,
   });

   gulp.watch("assets/**/*.scss", watchScss);
   gulp.watch("assets/**/*.js", watchJs);
   gulp.watch("index.html", watchHtml);
}

exports.watch = gulp.series(watchScss, watch);
exports.preview = preview;

exports.build = gulp.series(buildHtml, buildScss, buildJs, buildImage, buildFonts);
