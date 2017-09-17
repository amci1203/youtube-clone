const
    gulp = require('gulp'),
    css = require('gulp-postcss'),


    entry = './app/css/styles.css',
    out = './public',

    plugins = ['precss', 'autoprefixer', 'postcss-color-function']
        .map(p => require(p))

gulp.task('styles', () => gulp
    .src(entry)
    .pipe(css(plugins))
    .on('error', function (err) {
        console.error('ERROR PARSING CSS--\n' + err.toString())
        this.emit('end')
    })
    .pipe(gulp.dest(out))
)