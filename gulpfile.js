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
var mainBowerFiles = require('gulp-main-bower-files');
var gulpFilter = require('gulp-filter');
var flatten = require('gulp-flatten');
var minifyjs = require('gulp-js-minify');
var uglify = require('gulp-uglifyjs');
var fontmin = require('gulp-fontmin');

gulp.task('sass', function () {
    return gulp.src('./css/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
        browsers: ['last 15 versions']
    }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('css'));
        //.pipe(browserSync.stream());
});

gulp.task('sass:watch', function () {
    gulp.watch('./css/**/*.scss', ['sass']);
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("app/scss/*.scss", ['sass']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
});

gulp.task('image:optimization', function (){
    gulp.src('./img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('images'))
});

gulp.task('main-bower-files', function() {
    var filterJS = gulpFilter('**/*.js', { restore: true });
    return gulp.src('./bower.json')
        .pipe(mainBowerFiles())
        .pipe(filterJS)
        .pipe(gulp.dest('./min'));
});

gulp.task('flatten', function () {
    gulp.src('bower_components/**/*.min.js')
        .pipe(flatten())
        .pipe(gulp.dest('build/js'));
});

gulp.task('minify-js', function(){
    gulp.src('./js/**/script.js')
        .pipe(minifyjs())
        .pipe(gulp.dest('./min'));
});

gulp.task('uglify', function() {
    gulp.src('min/**/script.js')
        .pipe(uglify())
        .pipe(gulp.dest('./js/min'))
});

gulp.task('font:optimize', function () {
    return gulp.src('frontend/fonts/*.ttf')
        .pipe(fontmin({
            text: 'It is a 3.14zdec'
        }))
        .pipe(gulp.dest('./fonts'));
});

gulp.task('js', ['minify-js', 'uglify']);

gulp.task('default', ['browser-sync', 'sass:watch', 'image:optimization', 'main-bower-files', 'flatten']);


