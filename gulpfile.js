/**
 * Created by Constantine on 18.10.2015.
 */
"use strict";
let gulp = require('gulp'),
    concat = require('gulp-concat');

gulp.task('default', () => {
    //js
    gulp.src([
        './public/js/base.js',
        './public/js/modules/**/*.js',
        './public/js/modules/**/**/*.js'
    ])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./public/js/'));
});