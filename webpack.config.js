const path = require('path');

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
      // { //url-loader 사용시
      //   test: /\.(jpe?g|gif|png)$/i,
      //   type: 'asset',
      //   parser: {
      //     dataUrlCondition: {
      //       maxSize: 8 * 1024 // 8kb
      //     }
      //   }
      // },
      // { //file-loader 만 사용시
      //   test: /\.png/,
      //   type: 'asset/resource',
      // }
    ]
  }
}