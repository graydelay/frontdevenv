const path = require('path');
const webpack = require('webpack');
const banner = require('./my-banner-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/app.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve('./dist'),
    assetModuleFilename: '[name][ext]?[hash]' //file-loader output
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          process.env.NODE_ENV === 'production'
          ? MiniCssExtractPlugin.loader
          : 'style-loader',
          'css-loader',
        ],
      },
      { //url-loader 사용시
        test: /\.(jpe?g|gif|png)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 20 * 1024 // 20kb
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin(banner),
    new webpack.DefinePlugin({
      TWO: '1+1',
      TWOSTRING: JSON.stringify('1+1'),
      'api.domain': JSON.stringify('http://dev.api.domain.com')
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      templateParameters: {
        env: process.env.NODE_ENV === 'development' ? '(개발용)' : ''
      },
      minify: process.env.NODE_ENV === 'production' ? {
        collapseWhitespace: true,
        removeComments: true,
      } : false
    }),
    new CleanWebpackPlugin(),
    ...(process.env.NODE_ENV === 'production'
      ? [new MiniCssExtractPlugin({ filename: '[name].css' })]
      : []
    )
  ]
}
