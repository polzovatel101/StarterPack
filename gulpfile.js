/**
 * Created by Илья Яновой on 01.10.2016.
 */

'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglifyjs');
var fontmin = require('gulp-fontmin');

gulp.task('sass', function () {
    return gulp.src('./frontend/css/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
        browsers: ['last 15 versions']
    }))
        .pipe(cleanCSS({compatibility: 'ie10'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('css'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./public/css/*.scss', ['sass']);
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch("app/scss/*.scss", ['sass']);
    gulp.watch("./*.html").on('change', browserSync.reload);
});

gulp.task('image:optimization', function (){
    gulp.src('./frontend/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./public/images'))
});

gulp.task('uglify', function() {
    gulp.src('./frontend/js/script.js')
        .pipe(uglify())
        .pipe(gulp.dest('./js/'))
});

gulp.task('font:optimize', function () {
    return gulp.src('./frontend/fonts/*.ttf')
        .pipe(fontmin({
            text: 'It is a 3.14zdec'
        }))
        .pipe(gulp.dest('./fonts'));
});

gulp.task('js', ['minify-js', 'uglify']);

gulp.task('default', ['browser-sync', 'sass:watch', 'image:optimization']);


