const
    gulp = require('gulp'),
    webpack = require('webpack'),
    config = require('../webpack.config.js')

gulp.task('scripts', callback => {
    webpack(config, (err, stats) => {
        if (err)
            console.error(err.toString())
        else
            console.log('SCRIPT PACKING DONE\n' + stats.toString())

        callback()
    })
})