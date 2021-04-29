'use strict'

const gulp = require('gulp')
const sass = require('gulp-sass')
const csso = require('gulp-csso')
const htmlmin = require('gulp-htmlmin')
const sync = require('browser-sync').create()

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("src/sass/*.sass")
        .pipe(sass())
        .pipe(csso())
        .pipe(gulp.dest("src/css"))
        .pipe(sync.stream());
});

gulp.task('minifyHTML', () => {
    return gulp.src('src/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist'))
});

// Static Server + watching scss/html files
gulp.task('serve', gulp.series('sass', function() {

    sync.init({
        server: "./src"
    });
    gulp.watch("src/sass/*.sass", gulp.series('sass'));
    gulp.watch("src/*.html").on('change', sync.reload);
}));

gulp.task('default', gulp.series('serve'));