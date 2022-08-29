const webpack = require('webpack');
const path = require('path');
const MyWebpackPlugin = require('./my-webpack-plugin');
const banner = require('./my-banner-plugin');

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
          'style-loader',
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
      },
      // { //file-loader 만 사용시
      //   test: /\.(png|jpg|gif|svg)$/,
      //   type: 'asset/resource',
      // }
    ]
  },
  plugins: [
    new webpack.BannerPlugin(banner),
  ]
}
