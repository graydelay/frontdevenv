const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const banner = require('./my-banner-plugin');
const apiMocker = require('connect-api-mocker');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';

module.exports = {
  mode,
  entry: {
    main: './src/app.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve('./dist'),
    assetModuleFilename: '[name][ext]?[hash]' // file-loader output
  },
  devServer: {
    client: {
      overlay: {
        errors: true,
        warnings: false,
      }
    },
    port: 8090,
    setupMiddlewares: (middlewares, devServer) => {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }

      devServer.app.use(apiMocker('/api', 'mocks/api'));

      return middlewares;
    },
    hot: true,
  },
  optimization: {
    minimizer: mode === 'production' ? [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true // 콘솔 로그를 제거한다
          }
        }
      })
    ] : []
  },
  module: {
    rules: [
      {
        test: /\.(s[ac]ss|css)$/i,
        use: [
          process.env.NODE_ENV === 'production'
          ? MiniCssExtractPlugin.loader
          : 'style-loader',
          'css-loader',
          'sass-loader'
        ],
      },
      { // url-loader 사용시
        test: /\.(jpe?g|gif|png)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 20 * 1024 // 20kb
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
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
