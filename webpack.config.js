const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: 'development',
  target: 'web',
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
    path: path.resolve(__dirname, 'build'),
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
        type: 'asset/resource',
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
