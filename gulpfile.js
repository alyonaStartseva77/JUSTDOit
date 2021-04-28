'use strict'

const gulp = require('gulp')
const sass = require('gulp-sass')
const csso = require('gulp-csso')
const htmlmin = require('gulp-htmlmin');

sass.compiler = require('node-sass')

//compilation from SASS to CSS and minify CSS
gulp.task('styles', function () {
    return gulp.src('src/sass/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(csso())
        .pipe(gulp.dest('src/css'))
})

gulp.task('minifyHTML', () => {
    return gulp.src('src/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist'));
});