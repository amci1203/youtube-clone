const
    gulp = require('gulp'),
    watch = require('gulp-watch'),
    bSync = require('browser-sync'),
    
    browser = bSync.create(),
    stylesheet = './public/styles.css',

    fallback = require('connect-history-api-fallback'),
    log      = require('connect-logger')

gulp

    .task('default', () => gulp.start('watch'))

    .task('watch', ['build-source'], () => {
        // const
        //     injectIcons = require('../node_modules/react-evil-icons/tasks/icons'),

        //     INDEX_PATH = './public/index.html',
        //     PUBLIC_FOLDER = 'public'

        // injectIcons(INDEX_PATH, PUBLIC_FOLDER)
        const
            format = '%date %status %method %url',
            index = '/index.html',
            htmlAcceptHeaders = ['text/html', 'application/xhtml+xml']

        browser.init({
            notify : false,
            port   : 8888,
            proxy  : 'localhost:3000',

            middleware: [
                log({ format }),
                fallback({ format, htmlAcceptHeaders })
            ]
        })

        watch('./app/css/**/*.css', () => gulp.start('inject-styles'))
        watch('./app/js/**/*.js', () => gulp.start('load-scripts'))
        watch('./public/**/*.html', browser.reload)
    })

    .task('inject-styles', ['styles'], () => gulp
        .src(stylesheet)
        .pipe(browser.stream())
    )

    .task('load-scripts', ['scripts'], () => setTimeout(browser.reload, 200))

    .task('build-source', ['scripts', 'styles'])