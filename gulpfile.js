var gulp = require('gulp'), 
    runSequence = require('run-sequence'),
    run = require('gulp-run'),
    processhtml = require('gulp-processhtml'),
    htmlmin = require('gulp-htmlmin'),
    rename = require('gulp-rename');

var extDir = 'chrome-ext';

gulp.task('build', function() {
    return run('npm run build').exec();
});

gulp.task('ext', function(done) {
    runSequence(
        'build',
        'ext:popup',
        'ext:build',
        done
    );
});

gulp.task('ext:popup', function() {
    return gulp.src('index.html')
        .pipe(processhtml())
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(rename('popup.html'))
        .pipe(gulp.dest(extDir));
});

gulp.task('ext:build', function() {
    return gulp.src('dist/build.js')
        .pipe(gulp.dest(extDir));
});
