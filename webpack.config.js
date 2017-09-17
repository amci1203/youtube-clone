const path = require('path')

module.exports = {
  entry: './app/js/app.js',
  output: {
      path: path.join(__dirname, 'public'),
      filename: 'app.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        }
      }
    ]
  }
}