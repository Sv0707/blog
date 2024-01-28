const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

let mode = 'development'
let target = 'web'
if (process.env.NODE_ENV === 'production') {
  mode = 'production'
  target = 'browserslist'
}

module.exports = {
  mode,
  target,
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
  ],
  entry: './src/index.js',
  devtool: 'source-map',
  output: {
    publicPath: '/',
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.jsx', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.module.css$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
      },
      { test: /\.(html)$/, use: ['html-loader'] },
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
        type: mode === 'production' ? 'asset' : 'asset/resource',
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  devServer: {
    hot: true,
    historyApiFallback: true,
    port: 3000,
  },
}
