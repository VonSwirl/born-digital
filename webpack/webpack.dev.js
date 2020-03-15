const webpack = require('webpack')
const paths = require('./paths')
const Dotenv = require('dotenv-webpack')

const webpackDev = {
  mode: 'development',
  output: {
    filename: '[name].js',
    path: paths.outputPath,
    chunkFilename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              localsConvention: 'camelCase',
              modules: {
                localIdentName: '[local]___[hash:base64:5]'
              }
            }
          },
          'sass-loader'
        ]
      }
    ]
  },
  devServer: {
    contentBase: paths.outputPath,
    compress: true,
    hot: true,
    port: 3000
  },
  plugins: [new Dotenv(), new webpack.HotModuleReplacementPlugin()]
}

module.exports = webpackDev
