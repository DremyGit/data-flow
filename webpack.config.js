const path = require('path');
const entry = require('webpack-glob-entry');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const entries = entry('./src/example/*.js');

const entryHtmlPlugins = Object.keys(entries).map(function(name) {
  return new HtmlWebpackPlugin({
     template: './src/example/index.html',
     title: name,
     chunks: [name],
     filename: `${name}/index.html`,
     inject: 'body'
 })
});

module.exports = {
  mode: 'development',
  entry: entries,
  output: {
    filename: '[name]/index.js',
    path: path.resolve(__dirname, 'dist')
  },
  // devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env',
                {
                  useBuiltIns: 'usage'
                }
              ],
              ['@babel/preset-react']
            ],
            plugins: [
              ['@babel/plugin-proposal-decorators', { legacy: true }],
              ['@babel/plugin-proposal-class-properties', { loose: true }],
              ['@babel/plugin-transform-regenerator']
            ]
          }
        }
      }
    ]
  },
  plugins: [
    ...entryHtmlPlugins
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    stats: 'minimal',
    host: '0.0.0.0'
  }
};