'use strict';

global.$ = {
    gulp: require('gulp'),
    gp: require('gulp-load-plugins')(),
    sassInlineImage: require('sass-inline-image'),
    browserSync: require('browser-sync').create()
};

$.gulp.task('sass', function () {
    return $.gulp.src('./scss/**/*.scss')
        .pipe($.gp.sass({
            functions: $.sassInlineImage()
        }))
        .on('error', $.gp.notify.onError({title: 'Error SASS'}))
        .pipe($.gulp.dest('./css'));
        //.pipe($.browserSync.stream());
});

$.gulp.task('serve', function() {
    $.browserSync.init({
        open: true,
        server: './'
    });

    $.browserSync.watch(['./**/*.*', '!scss/**/*.scss']).on('change', $.browserSync.reload);
});

$.gulp.task('watch', function() {
    $.gulp.watch('./scss/**/*.scss', $.gulp.series('sass'));
});

$.gulp.task('default', $.gulp.series(
    'sass',
    $.gulp.parallel('serve', 'watch')
));
