const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require('terser-webpack-plugin');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = (nodeEnv === 'production');

module.exports = {
  mode: nodeEnv,
  optimization: {
    minimize: isProd,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress:{
            drop_console: true,
          }
        }
      }),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'h5p-jigsaw-puzzle.css'
    })
  ],
  entry: {
    dist: './src/entries/h5p-jigsaw-puzzle.js'
  },
  output: {
    filename: 'h5p-jigsaw-puzzle.js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'assets/[name][ext][query]'
  },
  target: ['web', 'es5'], // Damn you, IE11!
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(s[ac]ss|css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: ''
            }
          },
          { loader: "css-loader" },
          {
            loader: "sass-loader"
          }
        ]
      },
      {
        test: /\.svg|\.jpg|\.png$/,
        include: path.join(__dirname, 'src/images'),
        type: 'asset/resource'
      },
      {
        test: /\.mp3|\.wav$/,
        include: path.join(__dirname, 'src/audio'),
        type: 'asset/resource'
      },
      {
        test: /\.woff$/,
        include: path.join(__dirname, 'src/fonts'),
        type: 'asset/resource'
      }
    ]
  },
  stats: {
    colors: true
  },
  devtool: (isProd) ? undefined : 'eval-cheap-module-source-map'
};