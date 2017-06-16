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
    return gulp.src('./frontend/stylesheets/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
        browsers: ['last 15 versions']
    }))
        .pipe(cleanCSS({compatibility: 'ie10'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/css/'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./frontend/stylesheets/**/*.scss', ['sass']);
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch("./frontend/stylesheets/**/*.scss", ['sass']);
    gulp.watch("./frontend/js/*.js", ['js']);
    gulp.watch("./public/js/*.js").on('change', browserSync.reload);
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
        .pipe(gulp.dest('./public/js/'))
});

gulp.task('font:optimize', function () {
    return gulp.src('./frontend/fonts/*.ttf')
        .pipe(fontmin({
            text: 'It is a 3.14zdec'
        }))
        .pipe(gulp.dest('./public/fonts'));
});

gulp.task('js', ['uglify']);

gulp.task('default', ['browser-sync', 'image:optimization']);


