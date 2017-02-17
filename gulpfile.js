var gulp = require('gulp'),
    less = require('gulp-less');

gulp.task('compile:less', function() {
    return gulp.src('app/styles.less')
        .pipe(less())
        .pipe(gulp.dest('app'));
});

gulp.task('watch', ['compile:less'], function() {
    gulp.watch('app/styles.less', ['compile:less']);
});