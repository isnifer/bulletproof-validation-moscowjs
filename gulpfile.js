var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var less = require('gulp-less');

// Static Server + watching scss/html files
gulp.task('serve', ['less'], function() {

    browserSync.init({
        server: './'
    });

    gulp.watch('./less/custom.less', ['less']);
    gulp.watch('index.html').on('change', browserSync.reload);
});

// Compile less into CSS & auto-inject into browsers
gulp.task('less', function() {
    return gulp.src('less/custom.less')
        .pipe(less())

        // THIS FCKING SOLUTION! FCK YEAH!
        .on('error', function (e) {
            console.log(e.message);
            this.emit('end');
        })
        .pipe(gulp.dest('./build'))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
