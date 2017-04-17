var path = require('path')

const config = {
  entry: {
    'app': ['babel-polyfill', './src/app.js']
  },
  output: {
    path: path.resolve(__dirname, 'public/'),
    filename: 'app.js',
    publicPath: path.resolve(__dirname,'public/')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [ path.resolve(__dirname, 'src')],
        loader: 'babel-loader'
      },
      {
        test: /\.s?css$/,
        include: [ path.resolve(__dirname, 'src')],
        use: ['style-loader','css-loader', 'sass-loader']
      }
    ]
  },
  resolve: {
    modules: [ 'node_modules'],
    extensions: ['.js', '.jsx']
  },
  devServer: {
    contentBase: path.join(__dirname, "public"),
    inline: true,
    compress: false,
    publicPath: "/"
  }
}

module.exports = config