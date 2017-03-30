var path = require('path')

const config = {
  entry: {
    'app': ['babel-polyfill', './src/app.js']
  },
  output: {
    path: path.resolve(__dirname, 'public/'),
    filename: 'app.js',
    publicPath: 'public/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [ path.resolve(__dirname, 'src')],
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        include: [ path.resolve(__dirname, 'src')],
        use: ['style-loader','css-loader']
      }
    ]
  },
  resolve: {
    modules: [ 'node_modules'],
    extensions: ['.js', '.jsx']
  }
}

module.exports = config