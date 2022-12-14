const gulp       = require('gulp')
const browserify = require('browserify')
const babelify   = require('babelify')
// const uglify     = require('gulp-uglify-es').default
const source     = require('vinyl-source-stream')
// const buffer     = require('vinyl-buffer')

gulp.task('build', function () {
    return browserify()
        .add('index.js')
        .transform(babelify, {
            presets: [
                [
                    'env',
                    {
                        targets: {
                            node: 'current',
                        },
                    },
                ],
            ],
        })
        .bundle()
        .on('error', function (error) {
            console.error(error.toString())
        })
        .pipe(source('client.js'))
        //.pipe(buffer())
        //.pipe(uglify()) 
        .pipe(gulp.dest('./dist'))
})

gulp.task('watch', gulp.parallel('build'), function () {
    return gulp.watch('./modules/**/*.js', gulp.parallel('build'))
})

gulp.task('default', gulp.parallel('watch'))
